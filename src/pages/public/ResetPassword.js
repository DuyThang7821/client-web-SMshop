import React, { useState } from "react";
import { Button } from "../../components";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (response?.success) {
      toast?.success(response?.mes, { theme: "light" });
    } else toast.error(response?.mes, { theme: "light" });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-md shadow-md">
        <label htmlFor="password" className="block mb-2">
          Nhập mật khẩu mới:
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
          placeholder="Type here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button
            name="Gửi"
            handleOnClick={handleResetPassword}
            style="px-10 py-2 rounded-md text-white bg-green-500 font-semibold"
          >
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
