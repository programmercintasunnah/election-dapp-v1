import React, { useState } from "react";

const Body = ({ candidate1, candidate2, votecandidate, account }) => {
  const [Candidate, setCandidate] = useState("");

  const onchange = (e) => {
    setCandidate(e.target.value);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (Candidate.id !== 0) votecandidate(Number(Candidate));
    else window.alert("there is error in submission");
  };

  return (
    <div className="mt-4 text-center">
      <h2>
        <b>ELECTION DAPP</b>
      </h2>
      <hr />
      <div className="container mt-5">
        <table class="table table-striped table-hover">
          <tr>
            <td width="10%">Nomor Urut</td>
            <td>Nama Kandidat</td>
            <td>Jumlah Pemilih</td>
          </tr>
          <tr>
            <td>{candidate1.id}</td>
            <td>{candidate1.name}</td>
            <td>{candidate1.votecount}</td>
          </tr>
          <tr>
            <td>{candidate2.id}</td>
            <td>{candidate2.name}</td>
            <td>{candidate2.votecount}</td>
          </tr>
        </table>
        <h5>Pilih pilihan anda : </h5>
        <form onSubmit={onsubmit}>
          <select
            className="form-control mt-2"
            name="candidate"
            onChange={onchange}
          >
            <option defaultValue value="">
              Pilih
            </option>
            <option value="1">{candidate1.name}</option>
            <option value="2">{candidate2.name}</option>
          </select>
          <button className="btn btn-primary mt-3 btn-md w-100">
            Pilih nomor urut {Candidate}
          </button>
        </form>
        <p className="mt-5">
          Your address : <span className="font-weight-bold">{account}</span>
        </p>
      </div>
    </div>
  );
};

export default Body;
