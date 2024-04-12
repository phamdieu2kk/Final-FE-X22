import "./style.css";
import{ useState, useEffect } from "react";
import {  Table } from "antd";
import "./style.css";

const Ranks = () => {
  const [rankList, setRankList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      
      const sampleData = [
        { name: "John Doe", score: 100 },
        { name: "Jane Doe", score: 90 },
        { name: "John Smith", score: 80 },
        { name: "John", score: 70 },
      ];
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRankList(sampleData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
  ];

  return (
    
    <div className="ranks-container"
    style={{
     paddingLeft:"20px"
    }}>
      <h1 className="home__title"
        style={{
          textAlign: "center",
          fontFamily: "Playball",
        }}
        > Bảng xếp hạng
      </h1>
      <Table className="rank__list"
        dataSource={rankList}
        columns={columns}
        loading={loading}
        pagination={false}
      />
    </div>
   
  );
};

export default Ranks;