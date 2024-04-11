import "./style.css";
import React, { useState, useEffect } from "react";
import { Breadcrumb, Row, Col } from "antd";

const Ranks = () => {
  const [rankList, setRankList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Đây là nơi bạn có thể gọi API hoặc thực hiện các thao tác khởi tạo dữ liệu.
    // Ở đây, tôi sẽ tạo dữ liệu mẫu cho bảng xếp hạng.
    const fetchData = async () => {
      // Giả lập một số dữ liệu từ server hoặc bất kỳ nguồn dữ liệu nào khác.
      // Đây là nơi bạn sẽ thay thế bằng gọi API thực tế.
      const sampleData = [
        { name: "John Doe", score: 100 },
        { name: "Jane Doe", score: 90 },
        { name: "John Smith", score: 80 }
      ];
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRankList(sampleData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div  className="container-page">
      <h2
       style={{
        textAlign: "center",
        justifyContent:"center",
      }}
      >BẢNG XẾP HẠNG
      </h2>
      <Row className="rank_title" style={{
        textAlign: "center",
        justifyContent:"center",
      }}>
        <Col span={8}>Rank</Col>
        <Col span={8}>Name</Col>
        <Col span={8}>Score</Col>
      </Row>
      <div className="rank__list" style={{
        textAlign: "center",
        justifyContent:"center",
      }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          rankList.map((rank, index) => (
            <Row
              key={index}
              className="rank__item"
              style={{
                justifyContent: "center",
                padding: "0 10px",
                margin: "10px 0"
              }}
            >
              <Col span={8}>{index + 1}</Col>
              <Col span={8}>{rank.name}</Col>
              <Col span={8}>{rank.score}</Col>
            </Row>
          ))
        )}
      </div>
    </div>
  );
};

export default Ranks;