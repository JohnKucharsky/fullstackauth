import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createGoal,
  deleteGoal,
  getGoals,
} from "../../features/goals/goalSlice";
import "./dashboard.scss";

const Dashboard = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user } = useSelector(({ auth }) => auth);
  const { goals, isLoading, isError, message } = useSelector(
    ({ goals }) => goals,
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      nav("/login");
    }
    dispatch(getGoals());
    // return () => {
    //   dispatch(reset());
    // };
  }, [isError, message, nav, dispatch, user]);

  const submitForm = (e) => {
    e.preventDefault();
    // dispatch create goal
    dispatch(createGoal({ text: text }));
    setText("");
  };
  const GoalItemJSX = ({ v }) => {
    return (
      <div className="dashboard__bottom">
        <div>
          <p>{new Date(v.createdAt).toLocaleString("en-US")}</p>
          <h2>{v.text}</h2>
        </div>
        <Button variant="outlined" onClick={() => dispatch(deleteGoal(v._id))}>
          Delete
        </Button>
      </div>
    );
  };

  if (isLoading) {
    return <div style={{ color: "red", fontSize: "2rem" }}>Waiting</div>;
  }
  return (
    <div className="dashboard">
      <div className="dashboard__top">
        <h2>Welcome {user && user.name}</h2>
        <p>Goals Dashboard</p>
      </div>
      <div className="dashboard__middle">
        <form className="dashboard__middle--form" onSubmit={submitForm}>
          <TextField value={text} onChange={(e) => setText(e.target.value)} />
          <Button variant="outlined" type="submit">
            Add Goal
          </Button>
        </form>
      </div>
      <div>
        {goals.length > 0 ? (
          <div>
            {goals.map((v) => (
              <GoalItemJSX key={v._id} v={v} />
            ))}
          </div>
        ) : (
          <h3>You have no goals</h3>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
