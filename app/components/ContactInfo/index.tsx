"use client";

type Props = {
  id: number | undefined;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ContactInfo = ({ id, onSubmit }: Props) => {
  const inputStyles = `outline-0 text-[1.2em] border p-2 rounded-lg border-stone-400 focus:border-stone-200
  transition duration-300 bg-transparent`;
  const btnStyle = `p-3 rounded-lg bg-[#207dff] hover:bg-[#126ff1] font-bold text-white`;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 p-5 pb-5">
      <h1 className="font-bold text-2xl">Request Info</h1>
      <input type="text" name="id" id="id" value={id} className="hidden" />
      <input
        type="text"
        name="name"
        id="name"
        required
        placeholder="NAME"
        className={`${inputStyles}`}
      />
      <input
        type="text"
        name="phone"
        id="phone"
        required
        placeholder="PHONE"
        className={`${inputStyles}`}
      />
      <textarea
        name="message"
        id="message"
        className={inputStyles}
        required
        rows={3}
        maxLength={200}
        placeholder="MESSAGE"
      />
      <button className={`${btnStyle}`}>Request Info</button>
    </form>
  );
};

export default ContactInfo;
