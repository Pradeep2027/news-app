import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News({query, apiKey, setProgress, pageSize, country, category}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    console.log("Loading updateNews with page " + page + " category " + category);
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}${category===''?'':'&category='+category}${query===''?'':'&q='+query}&apiKey=${apiKey}&page=1&pageSize=${pageSize}`;
    let data = await fetch(url);
    setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData.totalResults);
    await setTotalResults(parsedData.totalResults);
    setProgress(70);
    setArticles(parsedData.articles || []);
    setLastPage(2>=Math.ceil(totalResults/pageSize));
    setProgress(100);
    console.log("totalResults " + totalResults + " pageSize " + pageSize + " lastPage " + lastPage);
  }

  useEffect(() => {
    document.title = `News Monkey - ${this.props.category === '' ? 'Top Headlines' : (this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1))}`;
    setLoading(true);
    setPage(1);
    updateNews();
    // eslint-disable-next-line
    setLoading(false);
  }, []);

  const fetchMoreData = async () => {
    console.log("Loading fetchMoreData with page " + (page+1) + " category " + category);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}${category===''?'':'&category='+category}${query===''?'':'&q='+query}&apiKey=${apiKey}&page=${page+1}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setPage(page+1);
    setArticles(articles.concat(parsedData.articles));
    setLastPage(page+1<=Math.ceil(totalResults/pageSize));
    console.log("totalResults " + totalResults + " pageSize " + pageSize + " lastPage " + lastPage);
  }

  // handleNextClick = async () => {
  //   setLoading(true);
  //   setPage(page+1);
  //   await updateNews();
  //   setLoading(false);
  //   setLastPage()
  // }

  // handlePrevClick = async () => {
  //   setLoading(true);
  //   setPage(page-1);
  //   await updateNews();
  //   setLoading(false);
  //   setLastPage(page-1>=Math.ceil(totalResults/pageSize));
  //   setLastPage(page-1>=Math.ceil(totalResults/pageSize);
  // }

  return (
    <>
      <h2 className="text-center mb-3" style={{marginTop : '72px'}}>News Monkey - Top {query ? query : category} Headlines</h2>
      <div className="container px-0">
        {loading ? <Spinner/> : null}
        <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={lastPage} loader={<Spinner />} style={{overflow: "visible"}}>
          <div className="row">
            {articles.map((a) => {
              return <NewsItem key={a.url} title={a.title} description={a.description} urlToImage={a.urlToImage} url={a.url} author={a.author} date={a.publishedAt} source={a.source.name}></NewsItem>
            })}
          </div>
        </InfiniteScroll>
      </div>
      {/* <div className="container px-0 d-flex justify-content-between">
        <button disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Prev</button>
        <button disabled={this.state.lastPage} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
      </div> */}
    </>
  );
}

News.defaultProps = {
  country:'us',
  pageSize:8,
  category:'',
  key:''
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  key: PropTypes.string
}