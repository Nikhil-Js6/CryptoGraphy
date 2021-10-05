
import React from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';
import Loader from './Loader';

const { Title } = Typography;

function Homepage(){

  const { data : cryptosData, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

    if(isFetching) return <Loader />;

    return(
       <div>
      
           <Title className="heading" level={2} >Global Crypto Stats</Title>
           <Row>
               <Col span={8}><Statistic title="Total Cryptocurrencies" value={globalStats.total}/></Col>
               <Col span={8}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
               <Col span={8}><Statistic title="Market Cap." value={millify(globalStats.totalMarketCap)}/></Col>
               <Col span={8}><Statistic title="24 Hr Volume" value={millify(globalStats.total24hVolume)}/></Col>
               <Col span={12}><Statistic title="Markets" value={millify(globalStats.totalMarkets)}/></Col>
               <Col span={8}><Statistic title="Order" value={globalStats.order}/></Col>
               <Col span={12}><Statistic title="Limit" value={millify(globalStats.limit)}/></Col>
           </Row>
           <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cryptocurrencies in the World</Title>
                <Title level={5} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
           </div>
           <Cryptocurrencies simplified={true}/>
           <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title level={5} className="show-more"><Link to="/news">Show more</Link></Title>
           </div>
           <News />

       </div>
    )
}

export default Homepage;
