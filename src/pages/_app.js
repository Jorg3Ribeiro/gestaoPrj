// ** Next Imports
import Head from "next/head";
import { Router } from "next/router";

// ** Service Imports
import { service } from "src/service";
import { Provider } from "react-redux";

// ** Loader Imports
import nProgress from "nprogress";

// ** Emotion Imports
import { CacheProvider } from "@emotion/react";

// ** Config Imports
import 'src/configs/i18n'
import { defaultACLObj } from "src/configs/acl";
import themeConfig from "src/configs/themeConfig";

