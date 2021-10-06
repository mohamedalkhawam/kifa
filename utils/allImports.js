// Pages
import localize from "../locales/i18n";
import React, { useEffect, useState, useRef } from "react";
import * as nativeElement from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import validator from "validator";
import { renderHeaderIcons } from "../helpers/renderHeaderIcons";
import { globalStyle, primaryColor, secondaryColor } from "../styles/index";
import colors from "../theme/colors/colors";
import fontsType from "../theme/fonts/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import normalize from "./normalizeSize";
import {
  addProduct,
  removeProduct,
  addOne,
  removeOne,
  clearList,
} from "../redux/actions/app";
import Loader from "../components/loader";
import _objI from "./_objI";
import _objO from "./_objO";
export {
  localize,
  colors,
  fontsType,
  AsyncStorage,
  normalize,
  useSelector,
  useDispatch,
  useEffect,
  useState,
  useRef,
  globalStyle,
  nativeElement,
  React,
  validator,
  primaryColor,
  secondaryColor,
  removeProduct,
  addProduct,
  addOne,
  removeOne,
  renderHeaderIcons,
  _objI,
  _objO,
  Loader,
  clearList,
};
