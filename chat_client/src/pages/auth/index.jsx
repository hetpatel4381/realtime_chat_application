import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import apiClient from "@/lib/api-client";
import { serverRoutes } from "@/utils/constants";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import { toast } from "sonner";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogIn = () => {
    if (!email.length) {
      toast.error("Email is Required!");
      return false;
    }
    if (!password.length) {
      toast.error("Password is Required!");
      return false;
    }
    return true;
  };

  const validateSignUp = () => {
    if (!email.length) {
      toast.error("Email is Required!");
      return false;
    }
    if (!password.length) {
      toast.error("Password is Required!");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm-Password should be same.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogIn()) {
      const response = await apiClient.post(
        serverRoutes.LOGIN_ROUTE,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("This is the Response: ", response);
    }
  };
  const handleSignup = async () => {
    if (validateSignUp()) {
      const response = await apiClient.post(
        serverRoutes.SIGNUP_ROUTE,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("This is the Response: ", response);
    }
  };

  return (
    <>
      <div className="h-[100vh] w-[100vw] flex items-center justify-center">
        <div className="h-auto bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 pb-5">
          <div className="flex flex-col gap-10 items-center justify-center">
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center justify-center">
                <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
              </div>
              <p className="font-medium text-center">
                Fill in the details to get start with best chat app!
              </p>
            </div>
            <div className="flex items-center justify-center w-full">
              <Tabs className="w-3/4">
                <TabsList className="flex bg-transparent w-full rounded-none">
                  <TabsTrigger
                    className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state-active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                    value="login"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state-active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                    value="signup"
                  >
                    Signup
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="login"
                  className="flex flex-col gap-5 mt-10"
                >
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-full p-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="Password"
                    className="rounded-full p-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button className="rounded-full p-6" onClick={handleLogin}>
                    Login
                  </Button>
                </TabsContent>
                <TabsContent value="signup" className="flex flex-col gap-5">
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-full p-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="Password"
                    className="rounded-full p-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="Password"
                    className="rounded-full p-6"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button className="rounded-full p-6" onClick={handleSignup}>
                    SignUp
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="hidden xl:flex justify-center items-center">
            <img
              src={Background}
              alt="Background login"
              className="h-[700px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
