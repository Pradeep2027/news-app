import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News({query, apiKey, setProgress, pageSize, country, category}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // document.title = `News Monkey - ${this.props.category === '' ? 'Top Headlines' : (this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1))}`;
  
  const updateNews = async () => {
    setProgress(10);
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}${category===''?'':'&category='+category}${query===''?'':'&q='+query}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    setProgress(30);
    let parsedData = await data.json();
    setProgress(70);
    setArticles(parsedData.articles || []);
    setPage(page)
    setTotalResults(parsedData.totalResults || 0);
    setLoading(false);
    setProgress(100);
    setLastPage(page+1>=Math.ceil(totalResults/pageSize));
  }

  useEffect(() => {
    setPage(1);
  }, [category,query]);

  useEffect(() => {
    updateNews();
  }, [page, category, query]);

  const fetchMoreData = async () => {
    setPage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}${category===''?'':'&category='+category}${query===''?'':'&q='+query}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults || 0);
    setLastPage(page+1>=Math.ceil(totalResults/pageSize));
  }

  // handleNextClick = async () => {
  //   this.setState({loading:true});
  //   await this.updateNews(+1);
  //   this.setState({
  //     page: this.state.page+1,
  //     loading: false,
  //     lastPage: this.state.page+1>=Math.ceil(this.state.totalResults/this.props.pageSize)
  //   })
  // }

  // handlePrevClick = async () => {
  //   this.setState({loading:true});
  //   await this.updateNews(-1);
  //   this.setState({
  //     page: this.state.page-1,
  //     loading: false,
  //     lastPage: this.state.page-1>=Math.ceil(this.state.totalResults/this.props.pageSize)
  //   })
  // }

  return (
    <>
      <h2 className="text-center my-3">News Monkey - Top {query ? query : category} Headlines</h2>
      <div className="container px-0">
        {loading ? <Spinner/> : null}
        <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={!lastPage} loader={<Spinner />} style={{overflow: "visible"}}>
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