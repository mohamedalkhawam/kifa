// Pages
import localize from "../locales/i18n";
import FastImage from "react-native-fast-image";
import React, { useEffect, useState, useRef } from "react";
import * as nativeElement from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import * as icons from "../icons/index";
import validator from "validator";
import { renderHeaderIcons } from "../helpers/renderHeaderIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { globalStyle, primaryColor, secondaryColor } from "../styles/index";
import colors from "../theme/colors/colors";
import fontsType from "../theme/fonts/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import normalize from "./normalizeSize";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  addProduct,
  removeProduct,
  addOne,
  removeOne,
} from "../redux/actions/app";
export {
  localize,
  wp,
  hp,
  colors,
  fontsType,
  FastImage,
  AsyncStorage,
  LinearGradient,
  normalize,
  RFPercentage,
  RFValue,
  icons,
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
};
