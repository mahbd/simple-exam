import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src={"/teacher.svg"}
        alt={""}
        width={1920}
        height={1080}
        style={{
          height: "95vh",
          width: "100%",
          objectFit: "cover",
          position: "fixed",
          zIndex: "-1",
        }}
      />
      <div>
        <InfoBoard />
        <div
          className="mt-5 chat chat-end text-6xl text-start"
          style={{ marginRight: "30vw" }}
        >
          <div className="chat-bubble bg-transparent">
            It&apos;s over Anakin, me I have the high ground.
          </div>
        </div>
        <div className={"mt-20"}>
          <input
            type="text"
            className={"ms-[8vw] mt-1 input rounded-s-2xl rounded-e-none"}
          />
          <button
            className={"btn btn-primary mt-0 rounded-e-2xl rounded-s-none"}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBoard() {
  return (
    <div
      className={
        "bg-info bg-transparent/30 rounded-3xl p-5 pb-7 w-[30rem] ms-[8vw] grid grid-cols-2 gap-1"
      }
    >
      <p
        className={
          "bg-success text-base-100 p-2 rounded-2xl mt-2 ms-2 h-10 col-span-1 font-extrabold"
        }
      >
        Correct Answers:
      </p>
      <p
        className={
          "bg-error text-base-100 p-2 rounded-2xl mt-2 ms-2 h-10 col-span-1 font-extrabold"
        }
      >
        Wrong Answers:
      </p>
      <p
        className={
          "bg-info text-base-100 p-2 rounded-2xl mt-2 ms-2 h-10 col-span-1 font-extrabold"
        }
      >
        Question Left:
      </p>
      <p
        className={
          "bg-info text-base-100 p-2 rounded-2xl mt-2 ms-2 h-10 col-span-1 font-extrabold"
        }
      >
        Time:
      </p>
    </div>
  );
}
