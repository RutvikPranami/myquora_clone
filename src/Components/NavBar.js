import React, { useEffect, useState } from "react";
import "../CSS/NavBar.css";
import {
  AssignmentTurnedInOutlined,
  CircleNotificationsRounded,
  ExpandMore,
  FeaturedPlayListOutlined,
  HouseRounded,
  PeopleAltOutlined,
  PeopleAltRounded,
  SearchRounded,
} from "@mui/icons-material";
import { deepPurple } from "@mui/material/colors";
import { Avatar, Button, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import db from "../firebase";
import Modal from "react-modal";
import firebase from "firebase";
import { setSearchResults } from "../features/searchResultslice";

function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const questionName = input;

  const [inputSearch, setInputSearch] = useState("");
  const [questionType, setQuestionType] = useState("General");

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setSearchResults(String(inputSearch) || ""));
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [inputSearch]);

  const handleQuestionType = (event) => {
    setQuestionType(event.target.value);
  };

  const handleQuestion = (e) => {
    e.preventDefault();
    setIsModalOpen(false);

    if (questionName) {
      db.collection("questions").add({
        user: user,
        question: input,
        imageUrl: inputUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        typeOfQuestion: questionType,
      });
    }

    setInput("");
    setInputUrl("");
    setQuestionType("General");
  };
  return (
    <div className="qHeader">
      <div className="qHeader__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/archive/9/91/20170609154431%21Quora_logo_2015.svg"
          alt="Logo"
        />
      </div>
      <div className="qHeader__icons">
        <div title="Home" className="qHeader__icon">
          <HouseRounded />
        </div>
        <div title="Features" className="qHeader__icon">
          <FeaturedPlayListOutlined />
        </div>
        <div title="Assignment" className="qHeader__icon">
          <AssignmentTurnedInOutlined />
        </div>
        <div title="People" className="qHeader__icon">
          <PeopleAltRounded />
        </div>
        <div title="Messages" className="qHeader__icon">
          <CircleNotificationsRounded />
        </div>
      </div>

      <div title="Search Here" className="qHeader__input">
        <SearchRounded />
        <input
          onChange={(e) => {
            setInputSearch(e.target.value);
          }}
          type="text"
          placeholder="Search"
        />
      </div>

      <div className="qHeade__Rem">
        <div title="Click to Logout" className="qHeader__Avtar">
          <Avatar
          sx={{ bgcolor: deepPurple[500] ,width:{sm:20 , md:30 , lg : 40} , height:{sm:20  , md:30 , lg : 40}}}
            src={user?.photo || ""}
            onClick={() => {
              auth.signOut();
            }}
          />
        </div>
        <Button
          title="Add Question"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add Question
        </Button>

        <Modal className="question_modal"
          isOpen={IsmodalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnOverlayClick={false}
        >
          <div className="modal__title">
            <h5>Add Question</h5>
          </div>
          <div className="modal__info">
            <Avatar
              className="avatar"
              sx={{bgcolor: deepPurple[500]}}
              src={
                user?.photo ||
                "https://t3.ftcdn.net/jpg/02/70/43/74/360_F_270437411_gU2TfrCFMM1zpQvAExGoinfcIgaOD7mk.jpg"
              }
            />
            <p>{user?.disPlayName || user?.email || ""} asked</p>
            <div className="question_type">
              <select value={questionType} onChange={handleQuestionType}>
                <option value="General">General</option>
                <option value="Important">Important</option>
              </select>
            </div>
          </div>
          <div className="modal__Field">
            <Input
            style={{color:"white"}}
              className="modal__Field_input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Question..."
            />
            <div className="modal__fieldLink">
            
              <input
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="Inclue a link that gives context"
              ></input>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="cancle" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button
              disabled={input.length === 0 ? true : false}
              type="sumbit"
              onClick={handleQuestion}
              className={`${input.length === 0 ? "disAdd" : "add"}`}
            >
              Add Question
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default NavBar;
