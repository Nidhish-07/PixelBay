import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import backgroundVideo from "../assets/background_video.mp4";
import { gapi } from "gapi-script";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = function (response) {
    // console.log(response);

    localStorage.setItem("user", JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: "*****.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full ">
        <video
          src={backgroundVideo}
          type="video/mp4"
          loop
          autoPlay
          controls={false}
          muted
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col bg-blackOverlay justify-center items-center top-0 right-0 left-0 bottom-0">
          <div className="p-5">
            <div className="w-[150px] height-[150px] text-5xl text-white">
              {/* have to add image here latter */}
              PixelBay
            </div>
            <div className="shadow-2xl">
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                render={(renderProps) => {
                  return (
                    <button
                      type="button"
                      className="bg-mainColor cursor-pointer rounded-sm shadow-lg flex h-10 items-center p-4 mt-4"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <FcGoogle className="mr-4" /> Sign In with Google
                    </button>
                  );
                }}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
