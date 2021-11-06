import React, { useContext, useEffect, useState } from "react";
import {SneeberContext} from "./../hardhat/SymfoniContext";

interface Props {}

export const Sneeber: React.FC<Props> = () => {
  const greeter = useContext(SneeberContext);
  const [message, setMessage] = useState("");
  const [inputGreeting, setInputGreeting] = useState("");
  useEffect(() => {
    const doAsync = async () => {
      if (!greeter.instance) return;
      console.log("Greeter is deployed at ", greeter.instance.address);
      try { 
      setMessage(await greeter.instance.greet());
      } catch(error) {
       console.log(error);
      }
    };
    doAsync();
  }, [greeter]);

  const handleSetGreeting = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!greeter.instance) throw Error("Greeter instance not ready");
    if (greeter.instance) {
      const tx = await greeter.instance.setGreeting(inputGreeting);
      console.log("setGreeting tx", tx);
      await tx.wait();
      const _message = await greeter.instance.greet();
      console.log("New greeting mined, result: ", _message);
      setMessage(_message);
      setInputGreeting("");
    }
  };
  return (
    <div>
      <p>{message}</p>
      <input
        value={inputGreeting}
        onChange={(e) => setInputGreeting(e.target.value)}
      ></input>
      <button onClick={(e) => handleSetGreeting(e)}>Set greeting</button>
    </div>
  );
};
