import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-3 py-3 border border-gray-300 rounded-xl text-gray-700 outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition duration-200"
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", address, { withCredentials: true });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) navigate("/cart");
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-10 bg-gradient-to-br from-pink-50 to-rose-100 rounded-3xl shadow-lg max-w-6xl mx-auto mt-10">
      {/* Left: Form */}
      <div className="flex-1 w-full md:w-1/2">
        <h2 className="text-3xl font-semibold text-gray-700">
          Add Shipping <span className="text-pink-500 font-bold">Address</span>
        </h2>

        <form
          className="space-y-4 mt-6 bg-white p-6 rounded-2xl shadow-md border border-pink-100"
          onSubmit={onsubmitHandler}
        >
          <div className="grid grid-cols-2 gap-4">
            <InputField
              handleChange={handleChange}
              address={address}
              type="text"
              placeholder="First Name"
              name="firstName"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              type="text"
              placeholder="Last Name"
              name="lastName"
            />
          </div>

          <InputField
            handleChange={handleChange}
            address={address}
            type="email"
            placeholder="Email"
            name="email"
          />
          <InputField
            handleChange={handleChange}
            address={address}
            type="text"
            placeholder="Street"
            name="street"
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              handleChange={handleChange}
              address={address}
              type="text"
              placeholder="City"
              name="city"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              type="text"
              placeholder="State"
              name="state"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              handleChange={handleChange}
              address={address}
              type="text"
              placeholder="Country"
              name="country"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              type="number"
              placeholder="Zipcode"
              name="zipcode"
            />
          </div>

          <InputField
            handleChange={handleChange}
            address={address}
            type="text"
            placeholder="Phone"
            name="phone"
          />

          <button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition">
            Save Address
          </button>
        </form>
      </div>

      {/* Right: Image */}
      <div className="hidden md:flex md:w-1/2 justify-center">
        <img
          className="w-[400px] h-[400px] object-cover rounded-2xl shadow-md"
          src="/images/crop-hand-holding-present.jpg"
          alt="Gift"
        />
      </div>
    </div>
  );
};

export default AddAddress;

