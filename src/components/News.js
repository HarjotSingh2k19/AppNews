import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // constructor(props) {
  //   super(props);
  //   // console.log("Hello, i am constructor from new component");

  //   // // mai componentDidMount se set krlunga values first page ki
  //   // this.state = {
  //   //   articles: [],
  //   //   loading: false,
  //   //   page: 1,
  //   //   totalResults: 0,
  //   // };

  //   // document.title = `${this.capitalizeFirstLetter(
  //   //   props.category
  //   // )} - NewsMonkey`;
  // }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();

    props.setProgress(70);

    // this.setState({
    //   loading: true,
    // });
    setLoading(true);

    console.log(parsedData);

    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${this.capitalizeFirstLetter(
      props.category
    )} - NewsMonkey`;
    updateNews();
  }, []);

  // async componentDidMount() {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();

  //   // this.setState({
  //   //   loading: true,
  //   // });

  //   // console.log(parsedData);
  //   // this.setState({
  //   //   articles: parsedData.articles,
  //   //   totalResults: parsedData.totalResults,
  //   //   loading: false,
  //   // }); // not making direct changes in constructor, but making through setState

  //   this.updateNews();
  // }

  const handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   props.country
    // }&category=${
    //   props.category
    // }&apiKey=${props.apiKey}&page=${
    //   page - 1
    // }&pageSize=${props.pageSize}`;
    // this.setState({
    //   loading: true,
    // });
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   page: page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });

    // await this.setState({ page: page - 1 });
    // this.updateNews();

    setPage(page - 1);
    updateNews();
  };

  const handleNextClick = async () => {
    // const maxPagesRequired = Math.ceil(1.9);
    // const maxPagesRequired = Math.ceil(totalResults / 20);
    // if (page + 1 > maxPagesRequired) {
    //   // no need of another page
    // }
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   props.country
    // }&category=${
    //   props.category
    // }&apiKey=${props.apiKey}&page=${
    //   page + 1
    // }&pageSize=${props.pageSize}`;
    // this.setState({
    //   loading: true,
    // });
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   page: page + 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });

    // await this.setState({ page: page + 1 });
    // this.updateNews();

    setPage(page + 1);
    updateNews();
  };

  const fetchMoreData = async () => {
    // this.setState({ page: page + 1 });
    // setPage(page+1);

    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    // this.setState({
    //   loading: true,
    // });

    console.log(parsedData);
    // this.setState({
    //   articles: articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    // });

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(page + 1);
  };

  return (
    <div className="container my-3">
      <h2
        className="text-center"
        style={{ margin: "30px 0px", marginTop: "90px" }}
      >
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {loading == true && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col md-3 sm-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://static.toiimg.com/photo/100936231.cms"
                    }
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            hidden={loading == true}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            hidden={loading == true}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.contextTypepropTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
