
import MyNotes from "./MyNotes";
import Alert from "./Alert";

const Home = ({showAlert}) => {

  return (
    <>
     
      <div className="container">
        <MyNotes  showAlert ={showAlert} />
      </div>
    </>
  );
};

export default Home;
