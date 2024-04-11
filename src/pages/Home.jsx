import TopicSlider from "../Components/TopicSlider";
import Ranks from "../Components/Ranks";
import { Row, Col } from "antd";
import Topic from "./Topic";
const Home = () => {
    return (
        <div className="container">
            <Row justify="center">
                <Col md={12}>
                    <TopicSlider />
                </Col>
                <Col md={12}>
                    <Ranks />
                </Col>
            </Row>
            {/* them 1 slider thu thach  */}
            <h1
                style={{
                    textAlign: "center",
                }}
                className="home__title"
            >
                Chủ đề nổi bật
            </h1>
            {/* <Topic/> */}
            <TopicSlider />

            <section className="section-instruction">
                <div className="container">
                    <h3 className="title-instruction">
                        <a
                            className="title-name"
                            href="/instruction"
                            title="Hướng dẫn & Điều khoản"
                        >
                            Hướng dẫn & Điều khoản
                        </a>
                    </h3>
                    Chúng tôi mong muốn tôn vinh ngôn ngữ mẹ đẻ mà bất cứ ai
                    trong số 54 dân tộc Việt Nam sống trên lãnh thổ Việt Nam và
                    trên thế giới đều có thể học được và tự hào với tiếng Việt.
                    Trải qua chặng đường gần 10 năm phát triển, Trạng Nguyên đã
                    trở thành cái tên quen thuộc đối với các em học sinh, quý
                    phụ huynh và các thầy cô, đồng thời hoàn thiện hệ sinh thái
                    sản phẩm đa dạng để tiếp tục góp phần xây dựng nền giáo dục
                    nước nhà.
                </div>
            </section>
        </div>
    );
};

export default Home;
