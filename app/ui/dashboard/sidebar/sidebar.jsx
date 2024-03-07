import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdReceipt,
  MdPersonAddAlt1 ,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";

import { FaUserDoctor,FaHospital,FaPersonShelter } from "react-icons/fa6";
import { signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Patient",
        path: "/dashboard/patients",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Tests",
        path: "/dashboard/tests",
        icon: <MdShoppingBag />,
      },
      {
        title: "Hospitals",
        path: "/dashboard/hospitals",
        icon: <FaHospital />,
      },
      {
        title: "Doctors",
        path: "/dashboard/doctors",
        icon: <FaUserDoctor />,
      },
      {
        title: "Receptionist",
        path: "/dashboard/receptionist",
        icon: <FaPersonShelter />,
      },
      {
        title: "Add Members",
        path: "/dashboard/addMembers",
        icon: <MdPersonAddAlt1/>,
      }
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Invoices",
        path: "/dashboard/invoices",
        icon: <MdReceipt />,
      },
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = async () => {

  const {user} = await getServerSession(authOptions)

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={"/noavatar.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.name}</span>
          <span className={styles.userTitle}>{user.role}</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>

    </div>
  );
};

export default Sidebar;
