import { Row, Col } from "antd";
import ChallangeSlider from "../Components/ChallengeSlider";
import Ranks from "../Components/Ranks";
import TopicSlider from "../Components/TopicSlider";

const Home = () => {
  return (
    <div className="container">
      <section className="section-homepage">
        <Row justify="center">
          <Col span={16}>
            <div style={{ overflow: "hidden" }}> 
              {/* Sử dụng overflow: hidden ở đây */}
              <ChallangeSlider/>
            </div>
          </Col>
          <Col span={8} style={{ display: "flex", alignItems: "center" }}>
            <Ranks />
          </Col>
          <TopicSlider />
        </Row>
        </section>
    </div>
  );
};

export default Home;