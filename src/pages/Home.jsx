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
          <Col span={8}>
            <Ranks />
          </Col>
        </Row>
        <div>
          <TopicSlider />
        </div>
        <h3 className="title-instruction">
          <a
            className="title-name"
            href="/instruction"
            title="Hướng dẫn & Điều khoản"
          >
            Hướng dẫn & Điều khoản
          </a>
        </h3>
        Chúng tôi mong muốn tôn vinh ngôn ngữ mẹ đẻ mà bất cứ ai trong số 54
        dân tộc Việt Nam sống trên lãnh thổ Việt Nam và trên thế giới đều có
        thể học được và tự hào với tiếng Việt. Trải qua chặng đường gần 10
        năm phát triển, Trạng Nguyên đã trở thành cái tên quen thuộc đối với
        các em học sinh, quý phụ huynh và các thầy cô, đồng thời hoàn thiện
        hệ sinh thái sản phẩm đa dạng để tiếp tục góp phần xây dựng nền giáo
        dục nước nhà.
      </section>
    </div>
  );
};

export default Home;