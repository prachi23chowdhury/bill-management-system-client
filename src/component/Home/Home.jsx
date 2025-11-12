import React from 'react';
import Banner from '../Banner';
import Category from '../Category';
import RecentBills from '../RecentBills';
import useDocumentTitle from '../../useDocomentTitle';



const Home = () => {
    useDocumentTitle('Home | MyApp'); 
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <RecentBills></RecentBills>
        </div>
    );
};

export default Home;