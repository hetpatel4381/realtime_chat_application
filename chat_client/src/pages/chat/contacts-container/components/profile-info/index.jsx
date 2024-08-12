import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { serverRoutes } from "@/utils/constants";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  const handleLogOut = async () => {};
  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-center px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="w-12 h-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${serverRoutes}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase w-12 h-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.charAt(0)
                  : userInfo.email.charAt(0)}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
        <div className="flex gap-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FiEdit2
                  onClick={() => navigate("/profile")}
                  className="text-purple-500 text-xl font-medium"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                <p>Edit Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoPowerSharp
                  onClick={handleLogOut}
                  className="text-red-500 text-xl font-medium"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
