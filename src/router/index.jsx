import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import asyncComponent from "@/asyncComponent";

const Home = asyncComponent(() => import("@/container/home/"));
const Category = asyncComponent(() => import("@/container/category/"));
const Shopcart = asyncComponent(() => import("@/container/shopcart/"));
const Personal = asyncComponent(() => import("@/container/personal/"));
const NavFooter = asyncComponent(() => import("components/footer/"));

export default class RouterConfig extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="page-wrapper">
          <div className="page-bd">
            <Switch>
              <Route path="/index" exact component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/shopcart" component={Shopcart} />
              <Route path="/personal" component={Personal} />
              <Redirect from="*" to="/index" />
            </Switch>
          </div>
          <NavFooter />
        </div>
      </BrowserRouter>
    );
  }
}
