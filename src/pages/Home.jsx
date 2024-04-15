import { Row, Col } from "antd";
import ChallangeSlider from "../Components/ChallengeSlider";
import Ranks from "../Components/Ranks";
import TopicSlider from "../Components/TopicSlider";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="container">
      <Row
        justify="space-between"
        // align="top"
        style={{
          marginTop: "2rem",
        }}
      >
        <Col span={15}>
          <ChallangeSlider />
        </Col>
        <Col span={8}>
          <Ranks />
        </Col>
      </Row>

      {currentUser && <TopicSlider />}
    </div>
  );
};

export default Home;
