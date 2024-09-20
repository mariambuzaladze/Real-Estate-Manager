import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../App";

interface Region {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  region_id: number;
}

interface Agent {
  id: number;
  name: string;
  surname: string;
}

export default function AddListing() {
  const { setShowAgent } = useContext(MyContext);
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  const fetchRegions = async () => {
    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/regions"
      );
      const data: Region[] = await response.json();
      setRegions(data);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  const fetchCities = async (regionId: number) => {
    try {
      const response = await fetch(
        `https://api.real-estate-manager.redberryinternship.ge/api/cities?region_id=${regionId}`
      );
      const data: City[] = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        {
          headers: {
            Authorization: "Bearer 9cfd8995-371f-4210-8952-8ca1881b89be",
          },
        }
      );
      const data: Agent[] = await response.json();
      setAgents(data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  useEffect(() => {
    fetchRegions();
    fetchAgents();
  }, []);

  return (
    <Formik
      initialValues={{
        is_rental: 0,
        address: "",
        zip_code: "",
        region_id: "",
        city_id: "",
        price: "",
        area: "",
        bedrooms: "",
        description: "",
        image: null,
        agent_id: "",
      }}
      validationSchema={Yup.object({
        address: Yup.string()
          .trim()
          .min(2, "მინიმუმ 2 სიმბოლო")
          .required("მისამართი აუცილებელია"),
        zip_code: Yup.number().required("საფოსტო ინდექსი აუცილებელია"),
        price: Yup.number().required("ფასი აუცილებელია"),
        area: Yup.number().required("ფართობი აუცილებელია"),
        bedrooms: Yup.number()
          .integer()
          .required("საძინებლების რაოდენობა აუცილებელია"),
        description: Yup.string()
          .nullable()
          .test(
            "minWords",
            "მინიმუმ 5 სიტყვაზე მეტი",
            (value) => !value || value.trim().split(/\s+/).length >= 5
          )
          .required("აღწერა აუცილებელია"),
        image: Yup.mixed().required("ფოტო აუცილებელია"),
        region_id: Yup.number().required("რეგიონი აუცილებელია"),
        city_id: Yup.number().required("ქალაქი აუცილებელია"),
        agent_id: Yup.number().required("აგენტი აუცილებელია"),
      })}
      onSubmit={async (values) => {
        setShowAgent(false);
        try {
          const response = await fetch(
            `https://api.real-estate-manager.redberryinternship.ge/api/real-estates`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer 9cfd8995-371f-4210-8952-8ca1881b89be",
              },
              body: JSON.stringify(values),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Failed: ${errorData.message || response.statusText}`
            );
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }}
    >
      {({ setFieldValue, values }) => (
        <div className="flex justify-center">
          <Form className="flex flex-col w-fit gap-6 w-[788px]">
            <h1 className="text-[32px] font-bold self-center">
              ლისტინგის დამატება
            </h1>

            <div className="flex flex-col">
              <label className="text-[#1A1A1F] text-lg uppercase font-bold font-helvetica">
                გარიგების ტიპი
              </label>
              <div className="flex gap-4">
                <label>
                  <Field
                    type="radio"
                    name="is_rental"
                    value={0}
                    checked={values.is_rental === 0}
                    onChange={() => setFieldValue("is_rental", 0)}
                  />
                  იყიდება
                </label>
                <label>
                  <Field
                    type="radio"
                    name="is_rental"
                    value={1}
                    checked={values.is_rental === 1}
                    onChange={() => setFieldValue("is_rental", 1)}
                  />
                  ქირავდება
                </label>
              </div>
            </div>

            <p className="text-[#1A1A1F] text-lg uppercase font-bold font-helvetica">
              მდებარეობა
            </p>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="address">მისამართი *</label>
                <Field
                  name="address"
                  type="text"
                  className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px] w-[384px]"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="zip_code">საფოსტო ინდექსი *</label>
                <Field
                  name="zip_code"
                  type="number"
                  className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px] w-[384px]"
                />
                <ErrorMessage
                  name="zip_code"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="region_id">რეგიონი</label>
                <Field
                  as="select"
                  name="region_id"
                  className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px] w-[384px]"
                  onChange={(e: any) => {
                    setFieldValue("region_id", e.target.value);
                    fetchCities(Number(e.target.value));
                    setFieldValue("city_id", "");
                  }}
                >
                  <option value="">აირჩიეთ რეგიონი</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="region_id"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="city_id">ქალაქი</label>
                <Field
                  as="select"
                  name="city_id"
                  className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px] w-[384px]"
                  disabled={!values.region_id}
                >
                  <option value="">აირჩიეთ ქალაქი</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="city_id"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <p className="text-[#1A1A1F] text-lg uppercase font-bold font-helvetica">
              ბინის დეტალები
            </p>
            <div className="flex  justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="price">ფასი</label>
                <Field
                  name="price"
                  type="number"
                  className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px] w-[384px]"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="area">ფართობი</label>
                <Field
                  name="area"
                  type="number"
                  className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px] w-[384px]"
                />
                <ErrorMessage
                  name="area"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <label htmlFor="bedrooms">საძინებლების რაოდენობა *</label>
            <Field
              name="bedrooms"
              type="number"
              className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px] w-[384px]"
            />
            <ErrorMessage
              name="bedrooms"
              component="div"
              className="text-red-500"
            />

            {/* Description & Image */}
            <label htmlFor="description">აღწერა *</label>
            <Field
              name="description"
              as="textarea"
              className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px] w-[384px]"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500"
            />

            <label htmlFor="image" className="font-bold">
              ატვირთეთ ფოტო *
            </label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={(event) => {
                setFieldValue(
                  "image",
                  event.currentTarget.files ? event.currentTarget.files[0] : ""
                );
              }}
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-red-500"
            />

            <p className="text-[#1A1A1F] text-lg uppercase font-bold font-helvetica">
              აგენტი
            </p>

            <div className="flex flex-col gap-2">
              <label htmlFor="agent_id">აირჩიე აგენტი</label>
              <Field
                as="select"
                name="agent_id"
                className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px] w-[384px]"
              >
                <option value="">აირჩიე აგენტი</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} {agent.surname}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="agent_id"
                component="div"
                className="text-red-500"
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
