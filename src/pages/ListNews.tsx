import React, { useState, useEffect } from "react";
import { Button, Card, Modal } from "antd";
import axios from "axios";

interface newsType {
  author: string;
  content: string;
  title: string;
  urlToImage: string;
  url: string;
  description: string;
}

export interface detailType {
  author: string;
  content: string;
  title: string;
  urlToImage: string;
  url: string;
}

const { Meta } = Card;

const ListNews: React.FC = () => {
  const [news, setNews] = useState<newsType[]>([]);
  const [detail, setDetail] = useState<detailType | null>(null);
  const [show, setShow] = useState(false);

  const handleCancelModal = () => {
    setShow(false);
  };

  const getNews = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?q=Apple&from=2022-12-26&sortBy=popularity&apiKey=4bf43740147849d1a7d4281ff5b05a56"
      );
      setNews(response.data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="container">
      <h2 className="title-web">Let's Read Articles</h2>
      <div className="card">
        {news?.map((item, index) => (
          <>
            <Card
              key={index}
              hoverable
              style={{
                width: 300,
                height: 700,
                margin: "20px",
                backgroundColor: "#C7BCA1",
                border: "none",
              }}
              cover={
                <img
                  alt="example"
                  src={item?.urlToImage}
                  style={{ padding: "10px", borderRadius: "25px" }}
                />
              }
            >
              <p>by: {item?.author}</p>
              <Meta title={item?.title} description={item?.description} />
              <Button
                className="btn"
                onClick={() => {
                  setShow(true);
                  setDetail(item);
                }}
              >
                Read Article
              </Button>
            </Card>
          </>
        ))}
      </div>

      <Modal
        title={detail?.title}
        open={show}
        onCancel={handleCancelModal}
        footer={null}
        className="Modal"
        width={1000}
      >
        <div className="w-full m-auto mt-5 p-3">
          <div style={{ width: "900px" }}>
            <img
              src={detail?.urlToImage}
              alt="imgArticle"
              style={{ width: "100%" }}
            />
          </div>
          <p style={{ margin: "20px" }}>Author: {detail?.author}</p>
          <p>{detail?.content}</p>
          <a href={detail?.url} target="_blank" className="" rel="noreferrer">
            read more ......
          </a>
        </div>
      </Modal>
    </div>
  );
};

export default ListNews;
