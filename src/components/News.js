import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [totalResults, settotalResults] = useState(0);
  const [page, setpage] = useState(1);


  const updateData = async () => {
    setloading(false);
    props.setProgress(15);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let fetchData = await fetch(url);
    props.setProgress(35);

    let parsedData = await fetchData.json();
    props.setProgress(70);

    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(loading);
    props.setProgress(100);
  };
  useEffect( () => {
    document.title=`The India Times -${capatilize(props.category)}`
    updateData();
     // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    setpage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let fetchData = await fetch(url);
    let parsedData = await fetchData.json();
   
    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
    
  };
  const capatilize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  if (!(page <= Math.ceil(totalResults / props.pageSize))) {
  }
 // console.log(!loading);
  return (
    <>
      <h1 className=" d-flex justify-content-center mt-5 mb-4">
        The India Times Top {capatilize(props.category)} Headlines
      </h1>
      {(!loading)? <Spinner/> :""}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((article) => {
              return (
                <div key={article.url} className="col-md-4">
                  <NewsItem articles={article} />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
