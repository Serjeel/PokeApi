import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setSearchInputData } from "../../redux/actions";
import { setPageNumber, setContentAmount } from "../../redux/actions";
import './PageInterface.scss';

interface Props {
  target: string
}

const PageInterface = ({ target }: Props) => {
  let history = useNavigate();
  const dispatch: any = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const allPokemons = useSelector((state: any) => state.allPokemons);
  const contentAmount = useSelector((state: any) => state.contentAmount);
  const pageNumber = useSelector((state: any) => state.pageNumber);

  const selectedPokemons = useSelector((state: any) => state.selectedPokemons);

  const searchInputData = useSelector((state: any) => state.searchInputData);

  const contentAmountButtonClick = (value: number) => {
    dispatch(setContentAmount(value));
    dispatch(setPageNumber(1));
    history(`/${target}/?page=1&amount=${value}`);
  }

  const pageNumberOnClick = (value: number) => {
    dispatch(setPageNumber(value));
    history(`/${target}/?page=${value}&amount=${contentAmount}`);
  }


  const inputDataChange = (e: any) => {
    dispatch(setSearchInputData(e.target.value));
  }

  return (
    <>
      <div className="allPokemons-interface">
        <div className="allPokemons-interface-block">
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
              inputDataChange(e);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default PageInterface;