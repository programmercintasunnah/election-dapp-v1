import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import Electionabi from "./contracts/Election.json";
import Navbar from "./Navbar";
import Body from "./Body";

function App() {
  useEffect(() => {
    loadWeb3();
    LoadBlockchainData();
  }, []);

  const [CurrentAccount, setCurrentAcoount] = useState("");
  const [Loader, setLoader] = useState(true);
  const [Electionsm, setElectionsm] = useState();
  const [Candidate1, setCandidate1] = useState();
  const [Candidate2, setCandidate2] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-ethereum browser detected. you should consider trying metamask!"
      );
    }
  };

  const LoadBlockchainData = async () => {
    setLoader(true);
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    console.log(account);
    setCurrentAcoount(account);
    const networkId = await web3.eth.net.getId();

    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(
        Electionabi.abi,
        networkData.address
      );
      const candidate1 = await election.methods.candidates(1).call();
      // const candidate1id = candidate1.id;
      // const candidate1name = candidate1.name;
      // const candidate1votecount = candidate1.votecount;

      const candidate2 = await election.methods.candidates(2).call();
      // const candidate2id = candidate2.id;
      // const candidate2name = candidate2.name;
      // const candidate2votecount = candidate2.votecount;

      setCandidate1(candidate1);
      setCandidate2(candidate2);

      setElectionsm(election);
      setLoader(false);
    } else {
      window.alert("the smart contract is not deployed current network");
    }
  };

  if (Loader) {
    return (
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden"></span>
      </div>
    );
  }

  const votecandidate = async (candidateid) => {
    setLoader(true);
    await Electionsm.methods
      .Vote(candidateid)
      .send({ from: CurrentAccount })
      .on("transactionhash", () => {
        console.log("successfuly");
      });
    setLoader(false);
  };

  return (
    <div>
      <Navbar account={CurrentAccount} />
      <Body
        candidate1={Candidate1}
        candidate2={Candidate2}
        votecandidate={votecandidate}
        account={CurrentAccount}
      />
    </div>
  );
}

export default App;
