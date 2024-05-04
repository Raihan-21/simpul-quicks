import Image from "next/image";
import FloatingAction from "./components/organisms/FloatingAction";
import FloatingActionButton from "./components/atoms/FloatingActionButton";
import Quicks from "./components/organisms/Quicks";

export default function Home() {
  const onTaskClick = async () => {
    "use server";
    console.log("clicked");
  };

  const onFloatingBtnClick = async () => {
    "use server";
    console.log("expand");
  };
  return (
    <main className=" min-h-[100vh] bg-dark-gray">
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Image
        src={"/icons/icon-bolt.svg"}
        width={24}
        height={24}
        alt="icon-bolt"
      />
      <Quicks />
    </main>
  );
}
