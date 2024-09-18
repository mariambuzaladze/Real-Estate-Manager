import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { MyContext } from "../App";

export default function AddAgent() {
  const { setShowAgent } = useContext(MyContext);

  const AddAgentSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .required("სახელი სავალდებულოა"),
    surname: Yup.string()
      .trim()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .required("გვარი სავალდებულოა"),
    email: Yup.string()
      .email("არავალიდური ელ.ფოსტა")
      .matches(/@redberry\.ge$/, "უნდა მთავრდებოდეს @redberry.ge-ით")
      .required("ელ.ფოსტა სავალდებულოა"),
    number: Yup.string()
      .matches(/^5\d{8}$/, "უნდა იყოს ფორმატში 5XXXXXXXX")
      .required("ნომერი სავალდებულოა"),
    avatar: Yup.mixed().required("სურათის ატვირთვა სავალდებულოა"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        number: "",
        avatar: null,
      }}
      validationSchema={AddAgentSchema}
      onSubmit={async (values) => {
        setShowAgent(false);
        try {
          const response = await fetch(
            `https://api.real-estate-manager.redberryinternship.ge/api/agents`,
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
      {({ setFieldValue, touched, errors, values }) => (
        <Form
          className="absolute left-[600px] top-[150px] bg-white px-[100px] py-[80px] w-fit rounded-[10px] flex flex-col gap-[60px]"
          style={{ boxShadow: "5px 5px 4px 0px rgba(0, 0, 0, 0.08)" }}
        >
          <h1 className="text-[32px] font-bold self-center">
            აგენტის დამატება
          </h1>

          <div className="flex gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-bold">
                  სახელი
                </label>
                <Field
                  name="name"
                  type="text"
                  className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px]"
                />
                {touched.name && errors.name ? (
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                ) : values.name && !errors.name ? (
                  <p className="text-green-500">✔ მინიმუმ ორი სიმბოლო</p>
                ) : (
                  <p>✔ მინიმუმ ორი სიმბოლო</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold">
                  ელ-ფოსტა
                </label>
                <Field
                  name="email"
                  type="email"
                  className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px]"
                />
                {touched.email && errors.email ? (
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                ) : values.email && !errors.email ? (
                  <p className="text-green-500">
                    ✔ გამოიყენეთ @redberry.ge ფოსტა
                  </p>
                ) : (
                  <p>✔ გამოიყენეთ @redberry.ge ფოსტა</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="surname" className="font-bold">
                  გვარი
                </label>
                <Field
                  name="surname"
                  type="text"
                  className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px]"
                />
                {touched.surname && errors.surname ? (
                  <ErrorMessage
                    name="surname"
                    component="div"
                    className="text-red-500"
                  />
                ) : values.surname && !errors.surname ? (
                  <p className="text-green-500">✔ მინიმუმ ორი სიმბოლო</p>
                ) : (
                  <p>✔ მინიმუმ ორი სიმბოლო</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="number" className="font-bold">
                  ტელეფონის ნომერი
                </label>
                <Field
                  name="number"
                  type="text"
                  className="border border-[1px] border-[#808A93] rounded-[6px] h-[36px]"
                />
                {touched.number && errors.number ? (
                  <ErrorMessage
                    name="number"
                    component="div"
                    className="text-red-500"
                  />
                ) : values.number && !errors.number ? (
                  <p className="text-green-500">✔ მხოლოდ ციფრები</p>
                ) : (
                  <p>✔ მხოლოდ ციფრები</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="avatar" className="font-bold">
              ატვირთეთ ფოტო
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              onChange={(event) => {
                setFieldValue(
                  "avatar",
                  event.currentTarget.files ? event.currentTarget.files[0] : ""
                );
              }}
            />
            <ErrorMessage
              name="avatar"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="self-end flex gap-4">
            <button
              type="reset"
              className="text-[#F93B1D] border border-[1px] border-[#F93B1D] rounded-[10px] px-4 py-3 ml-4 hover:bg-[#F3F3F3]"
              onClick={() => {
                setShowAgent(false);
              }}
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="text-white bg-[#F93B1D] rounded-[10px] px-4 py-3 hover:bg-[#DF3014]"
            >
              დაამატე აგენტი
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
