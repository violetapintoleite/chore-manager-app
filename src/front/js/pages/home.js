import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import InspoQuote from "../component/inspoQuote";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			
			<InspoQuote></InspoQuote>
			
		</div>
	);
};
