import React, {Component} from "react";
import Aux from "../../hoc/AuxComp"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.removeIngredient}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    modal={this.purchaseHandler}/>
            </Aux>
        );
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert("You continue!");
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(ingKey => {
            return ingredients[ingKey];
        }).reduce((sum, el) => {
            return sum += el 
        }, 0);

        this.setState({purchasable: sum > 0});
    }

    addIngredient = (ingredient) => {
        const oldCount = this.state.ingredients[ingredient];
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[ingredient] = oldCount + 1;

        const newPrice = INGREDIENT_PRICES[ingredient] + this.state.totalPrice; 

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredient= (ingredient) => {
        const oldCount = this.state.ingredients[ingredient];
        if (oldCount > 0){
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[ingredient] = oldCount - 1;
            
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[ingredient]; 

            this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
            this.updatePurchaseState(updatedIngredients);
        }
    }

}

export default BurgerBuilder;