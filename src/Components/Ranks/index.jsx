import { useState, useEffect } from "react";
import { Table, Spin, Alert, List } from "antd";
import api from "../../api";
import "./style.css";

const Ranks = () => {
  const [rankList, setRankList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getRankList.invoke({});
        setRankList(response.data.rankList);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tìm bảng xếp hạng:", error);
        setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Hạng",
      dataIndex: "rank",
      key: "rank",
      className: "rank-column",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      className: "name-column",
    },
    {
      title: "Điểm số",
      dataIndex: "totalPoint",
      key: "totalPoint",
      className: "totalPoint-column",
    },
  ];

  return (
    <div
      className="ranks-container"
      style={{
        maxHeight: "100%",
        backgroundColor: "#b44445",
        padding: "1rem 2rem",
        borderRadius: "10px",
      }}
    >
      <h1
        style={{
          color: "#f5d612",
          textAlign: "center",
          marginBottom: "2rem",
        }}
        className="home-title"
      >
        Bảng xếp hạng
      </h1>
      <div
        className="table-wrapper"
        style={{
          height: "100%",
        }}
      >
        {error ? (
          <Alert message={error} type="error" showIcon />
        ) : loading ? (
          <Spin size="large" />
        ) : rankList.length === 0 ? (
          <p>Không có dữ liệu để hiển thị.</p>
        ) : (
          <>
            <List>
              {rankList.map((item, index) => (
                <List.Item
                  key={item._id}
                  style={{
                    padding: "1rem",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                  }}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={`Điểm số: ${item.totalPoint}`}
                  />
                  <div>{index + 1}</div>
                </List.Item>
              ))}
            </List>
          </>
        )}
      </div>
    </div>
  );
};

export default Ranks;

// import { useState, useEffect } from "react";
// import { Table, Spin, Alert } from "antd";
// import api from "../../api";
// import "./style.css";

// const Ranks = () => {
//   const [rankList, setRankList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.getRankList.invoke({});
//         setRankList(response.data.rankList);
//         setLoading(false);
//       } catch (error) {
//         console.error("Lỗi khi tìm bảng xếp hạng:", error);
//         setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const columns = [
//     {
//       title: "Hạng",
//       dataIndex: "rank",
//       key: "rank",
//       className: "rank-column",
//     },
//     {
//       title: "Tên",
//       dataIndex: "name",
//       key: "name",
//       className: "name-column",
//     },
//     {
//       title: "Điểm số",
//       dataIndex: "totalPoint",
//       key: "totalPoint",
//       className: "totalPoint-column",
//     },
//   ];

//   return (
//     <div
//       className="ranks-container"
//       style={{
//         maxHeight: "100%",
//         backgroundColor: "#b44445",
//         padding: "1rem 2rem",
//         borderRadius: "10px",
//       }}
//     >
//       <h1 className="home-title" style={{ textAlign: "center" }}>
//         Bảng xếp hạng
//       </h1>
//       <div className="table-wrapper">
//         {error ? (
//           <Alert message={error} type="error" showIcon />
//         ) : loading ? (
//           <Spin size="large" />
//         ) : rankList.length === 0 ? (
//           <p>Không có dữ liệu để hiển thị.</p>
//         ) : (
//           <Table
//             dataSource={rankList}
//             columns={columns}
//             pagination={false}
//             className="custom-table"
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Ranks;
