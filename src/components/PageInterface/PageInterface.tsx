import { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import './AllPokemons.scss';

const PageInterface = () => {
  let history = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const allPokemons = useSelector((state: any) => state.allPokemons);
  const [contentAmount, setContentAmount] = useState(10);
  const [pageNumber, setPageNumber] = useState(Number(searchParams.get('page')) || 1);

  const [selectedPokemons, setSelectedPokemons]: any = useState([]);

  const [searchInputData, setSearchInputData] = useState('');

  const contentAmountButtonClick = (value: number) => {
    setContentAmount(value);
    setPageNumber(1);
    history(`/allPokemons/?page=1&amount=${value}`);
  }

  const pageNumberOnClick = (value: number) => {
    setPageNumber(value);
    history(`/allPokemons/?page=${value}&amount=${contentAmount}`);
  }

  useEffect(() => {
    console.log(selectedPokemons);

    if (searchInputData) {
        let searchArray: any = [];

        for (let i = 0; i < allPokemons.length; i++) {
            if (allPokemons[i].name.includes(searchInputData)) {
                searchArray.push(allPokemons[i]);
            }
        }

        let subArray: any = [];
        for (let i = 0; i < Math.ceil(searchArray.length / contentAmount); i++) {
            subArray[i] = searchArray.slice((i * contentAmount), (i * contentAmount) + contentAmount);
        }
        setSelectedPokemons(subArray);
        setPageNumber(1);
        history(`/allPokemons/?page=1&amount=${contentAmount}`);
    } else {
        let subArray: any = [];
        for (let i = 0; i < Math.ceil(allPokemons.length / contentAmount); i++) {
            subArray[i] = allPokemons.slice((i * contentAmount), (i * contentAmount) + contentAmount);
        }
        setSelectedPokemons(subArray);
    }
    console.log(selectedPokemons);

}, [allPokemons, contentAmount, searchInputData])

  return (
    <>
      <div className="interface">
        <div className="interface-block">
          <div className="page-data">
            <div className="amount">
              <span>Amount: </span>
              <button className={contentAmount === 10 ? "amount-button-active" : "amount-button"} onClick={() => contentAmountButtonClick(10)}>10</button>
              <button className={contentAmount === 20 ? "amount-button-active" : "amount-button"} onClick={() => contentAmountButtonClick(20)}>20</button>
              <button className={contentAmount === 50 ? "amount-button-active" : "amount-button"} onClick={() => contentAmountButtonClick(50)}>50</button>
            </div>
            <div className="pages">
              <span>Page: </span>
              {
                selectedPokemons.length !== 0 && selectedPokemons.map((pokemon: any, i: number) =>
                  <button className={pageNumber === i + 1 ? "pages-button-active" : "pages-button"} key={'pages-button' + i} onClick={() => pageNumberOnClick(i + 1)}>{i + 1}</button>
                )
              }
            </div>
          </div>
          <input className="search-input" type="text" placeholder="Search"
            value={searchInputData}
            onChange={(e: any) => {
              setSearchInputData(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default PageInterface;