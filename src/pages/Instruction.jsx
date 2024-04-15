import { Link } from "react-router-dom";
import { Breadcrumb, Row, Col, Table } from "antd";

const Instruction = () => {
 
  const columns = [
    {
      title: "Loại câu hỏi",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (text, record) => <strong>{record.type}</strong>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
  ];

  const data = [
    {
      key: "1",
      type: "Một đáp án đúng",
      description: "Sẽ hiện ra câu hỏi và bạn cần chọn đáp án đúng từ các lựa chọn. Mỗi câu trả lời đúng sẽ được tính điểm, nhưng nếu bạn chọn sai, bạn sẽ mất điểm. Bạn sẽ nhận được điểm số cao nhất nếu bạn trả lời đúng tất cả các câu hỏi. Hãy chuẩn bị sẵn sàng và bắt đầu chơi!",
    },
    {
      key: "2",
      type: "Nhiều đáp án đúng",
      description: "Sẽ hiện ra câu hỏi và bạn cần chọn  các đáp án bạn cho là đúng từ các lựa chọn. Mỗi câu trả lời đúng sẽ được tính điểm, nhưng nếu bạn chọn sai, bạn sẽ mất điểm. Bạn sẽ nhận được điểm số cao nhất nếu bạn trả lời đúng tất cả các câu hỏi. Hãy chuẩn bị sẵn sàng và bắt đầu chơi!",
    },
    {
      key: "3",
      type: "Sắp xếp",
      description: "Sẽ hiện ra câu hỏi và bạn cần sắp xếp các lựa chọn theo thứ tự đúng. Mỗi câu trả lời đúng sẽ được tính điểm, nhưng nếu bạn sắp xếp sai các thứ tự , bạn sẽ mất điểm. Bạn sẽ nhận được điểm số cao nhất nếu bạn trả lời đúng tất cả các câu hỏi. Hãy chuẩn bị sẵn sàng và bắt đầu chơi!",
    },
  ];

  
  return (
    <>
      <div className="container">
        <div className="title-home">
          <Breadcrumb items={[{ title: <Link to="/">Trang chủ</Link> }, { title: "Hướng dẫn" }]} />
        </div>

        <h3 className="title-instruction" style={{ color: "black", textAlign: "center" }}>
          Hướng dẫn & Điều khoản
        </h3>
        <div className="content-instruction" style={{ color: "black", fontSize: "16px" }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
            <p>
                - Chào mừng bạn đến với trang web trò chơi có tên là TIẾNG VIỆT LÀ DỄ !  Chúng tôi mong muốn tôn vinh ngôn ngữ mẹ đẻ mà bất cứ ai trong số 54
                dân tộc Việt Nam sống trên lãnh thổ Việt Nam và trên thế giới đều có
                thể học được và tự hào với tiếng Việt.
              </p>
              <p>
                -Trong trò chơi này, bạn sẽ chơi khi bắt đầu thực hiện thử thách.
              </p>
              
              <p>
                - Đối tượng: tất cả mọi người
              </p>
              <p>
                - Mọi người chơi không bị giới hạn số lần chơi.
              </p>
              <p>
                - Thời gian: 3 phút cho mỗi một thử thách
              </p>
             
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                style={{ border: "1px solid #ddd", marginBottom: "16px" }}
               
              />
              <p> - Điểm sẽ có 3 mức độ để tính:</p>
              <ul className="column-list" style={{
                columnCount:"3",
                listStyleType: "none",
                padding: 0,
              }}>
  <li className="type-instruction">Dễ: 100 điểm</li>
  <li className="type-instruction">Vừa: 100 điểm</li>
  <li className="type-instruction">Khó: 300 điểm</li>
</ul>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Instruction;