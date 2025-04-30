import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Validation Schema
const formSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  username: yup.string().required("Username is required").min(3),
  contactNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  issueType: yup.string().required("Issue type is required"),
  priority: yup.string().required("Priority is required"),
  description: yup.string().required("Description is required"),
  contactMethod: yup.string().required("Contact method is required"),
});

const Inquiry = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse authUser from localStorage", error);
      }
    }
  }, []);

  const onSubmit = async (data) => {
    const inquiryData = {
      user,
      name: data.username,
      email: data.email,
      contactNumber: data.contactNumber,
      issueType: data.issueType,
      priority: data.priority,
      description: data.description,
      contactMethod: data.contactMethod,
    };

    try {
      const res = await axios.post("http://localhost:5000/inquiry", inquiryData);
      if (res.status === 201) {
        toast.success("Inquiry added successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit inquiry");
    }
  };

  const issues = ["General Issue", "Billing Issue", "Technical Issue"];
  const priorityOptions = ["Low", "Medium", "High"];
  const contactMethods = ["Text", "Phone", "On Location"];

  return (
    <div className="p-10 md:max-w-screen-md">
      <form
        className="mt-4 flex gap-2 flex-col p-5 bg-white rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          size="md"
          variant="filled"
          type="text"
          label="Username"
          placeholder="Enter username"
          {...register("username")}
          isInvalid={!!errors.username}
          errorMessage={errors.username?.message}
        />

        <Input
          size="md"
          variant="filled"
          type="email"
          label="Email"
          placeholder="Enter email"
          {...register("email")}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />

        <Select
          label="Issue"
          placeholder="Select Issue"
          variant="filled"
          {...register("issueType")}
          isInvalid={!!errors.issueType}
          errorMessage={errors.issueType?.message}
        >
          {issues.map((issue) => (
            <SelectItem key={issue} value={issue}>
              {issue}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Priority"
          placeholder="Select Priority"
          variant="filled"
          {...register("priority")}
          isInvalid={!!errors.priority}
          errorMessage={errors.priority?.message}
        >
          {priorityOptions.map((p) => (
            <SelectItem
              key={p}
              value={p}
              style={{
                boxShadow:
                  p === "High"
                    ? "5px 0 0 red"
                    : p === "Medium"
                    ? "5px 0 0 orange"
                    : "5px 0 0 green",
                color:
                  p === "High"
                    ? "red"
                    : p === "Medium"
                    ? "orange"
                    : "green",
                fontWeight: "600",
              }}
            >
              {p}
            </SelectItem>
          ))}
        </Select>

        <Input
          label="Phone Number"
          placeholder="Enter phone number"
          type="text"
          maxLength={10}
          {...register("contactNumber")}
          isInvalid={!!errors.contactNumber}
          errorMessage={errors.contactNumber?.message}
        />

        <Textarea
          size="md"
          variant="filled"
          label="More Information"
          placeholder="More Information"
          {...register("description")}
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
        />

        <Select
          label="Contact Method"
          placeholder="Select Contact Method"
          variant="filled"
          {...register("contactMethod")}
          isInvalid={!!errors.contactMethod}
          errorMessage={errors.contactMethod?.message}
        >
          {contactMethods.map((cm) => (
            <SelectItem key={cm} value={cm}>
              {cm}
            </SelectItem>
          ))}
        </Select>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="bg-black text-white mt-2"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Inquiry;
