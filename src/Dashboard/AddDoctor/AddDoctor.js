import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Pages/Shared/Loading/Loading";

const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const { data: specialities = [], isLoading } = useQuery({
    queryKey: ["speciality"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/appointmentSpecialty");
      const data = await res.json();
      return data;
    },
  });

  const handleAddDoctor = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image',image);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`;
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(imgData => {
      if(imgData.success){
        const doctor = {
          name: data.name,
          email: data.email,
          speciality: data.speciality,
          image: imgData.data.url
        }
        
        fetch('http://localhost:5000/doctors', {
          method: 'POST',
          headers:{
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(doctor)
        })
        .then(res => res.json())
        .then(result => {
          if(result.acknowledged){
            toast.success('Doctors added successfully');
            navigate('/dashboard/managedoctors')
          }
        })
      }
    })

  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-96 p-8">
      <h1 className="text-3xl font-semibold my-10">Add a new Doctor</h1>
      <form
        onSubmit={handleSubmit(handleAddDoctor)}
        className="bg-white p-6 w-96"
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p role="alert" className="text-red-500">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: "Email Address is required" })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p role="alert" className="text-red-500">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full py-5">
          <label className="label">
            <span className="label-text">Speciality</span>
          </label>
          <select
            {...register("speciality")}
            className="select select-bordered w-full max-w-xs"
          >
            {specialities?.map((specility) => (
              <option key={specility._id} value={specility.name}>
                {specility.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs pb-6">
          <label className="label">
            {" "}
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            {...register("image", {
              required: "Photo is Required",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.img && <p className="text-red-500">{errors.img.message}</p>}
        </div>
        <input
          className="btn btn-accent w-full"
          type="submit"
          value="Add a doctor"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
