"use client";

import React, { useEffect, useRef, useId } from "react";

interface CardImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface CardRevealProps {
  bgColor?: string;
  card1Image?: CardImage; card1Title?: string; card1Body?: string; card1BtnText?: string; card1BtnLink?: string;
  card2Image?: CardImage; card2Title?: string; card2Body?: string; card2BtnText?: string; card2BtnLink?: string;
  card3Image?: CardImage; card3Title?: string; card3Body?: string; card3BtnText?: string; card3BtnLink?: string;
}

interface CardData {
  image?: CardImage;
  title?: string;
  body?: string;
  buttonText?: string;
  buttonLink?: string;
}

const ROTATIONS = [-4, 5, -3];

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

/* Hand-drawn rectangle path for the scribble border.
   Coordinates inside a 400×600 viewBox with slight wobble baked in. */
const CARD_PATH = `M 28 18
  C 22 19, 16 24, 15 32
  L 12 560
  C 11 572, 18 581, 30 582
  L 368 580
  C 380 579, 389 570, 390 558
  L 392 32
  C 391 20, 382 12, 370 13
  L 28 18 Z`;

/* Smaller cable swoops between cards */
const CABLE_12 = `M 0 45 C 8 42, 16 44, 22 48 C 28 53, 32 60, 38 64 C 44 68, 52 66, 58 62 C 64 58, 70 50, 76 45`;
const CABLE_23 = `M 0 75 C 8 72, 16 74, 22 78 C 28 83, 32 90, 38 94 C 44 98, 52 96, 58 92 C 64 88, 70 80, 76 75`;

/* Plug SVG path (simplified from the original) */
const PLUG_PATH = `M1963.25 194.891V206.772C1961.43 207.691 1960.09 208.998 1959.1 208.774C1945.04 205.601 1931.08 210.064 1917.04 209.183C1909.42 208.703 1907.3 206.996 1906.04 198.756C1905.9 197.837 1905.82 196.627 1905.22 196.105C1894.26 186.495 1897.09 173.147 1897.32 161.442C1897.58 149.025 1902.66 137.342 1913.15 128.929C1916.45 126.269 1918.91 122.539 1921.78 119.273C1933.12 121.486 1944.33 123.365 1955.39 125.941C1964.17 127.985 1964.84 134.248 1957.46 141.877C1959.9 142.96 1962.44 143.862 1964.74 145.173C1968.27 147.171 1968.54 150.509 1967.58 153.99C1966.49 157.969 1963.08 157.623 1960.13 157.349C1950.11 156.405 1943.58 148.785 1943.03 136.849C1937.04 135.942 1930.89 135.007 1924.73 134.071C1928.08 138.147 1935.14 137.144 1934.93 144.574C1934.74 151.196 1932.57 156.275 1926.26 159.09C1919.45 157.265 1917.52 152.477 1918.2 144.33C1915.76 146.892 1913.55 148.14 1913.09 149.864C1910.75 158.462 1907.65 166.867 1910.98 176.24C1913.13 182.318 1913.29 189.104 1914.43 196.168H1937.02C1932.68 188.969 1928.86 182.617 1934.76 176.021C1949.41 174.398 1952.13 179.043 1945.17 195.409C1951.64 193.331 1957.69 192.83 1963.63 195.245L1963.25 194.891Z`;

const PLUG_PATH_2 = `M1963.63 195.244C1961.45 188.61 1962.22 182.987 1965.79 176.366C1971.62 165.559 1971.3 153.231 1968.6 141.277C1967.58 136.767 1967.05 132.713 1970.93 129.219C1977.28 129.109 1980.68 133.042 1980.69 138.394C1980.71 149.328 1983.47 160.299 1980.1 171.27C1978.14 177.617 1977.38 184.323 1975.8 190.797C1974.33 196.774 1971.54 197.583 1963.25 194.89L1963.63 195.244Z`;

const CORD_PATH = `M933.845 389.913C933.979 390.617 934.11 391.317 934.245 392.021C936.605 391.688 938.97 391.359 941.33 391.03C941.284 390.659 941.229 390.284 941.178 389.913H933.845ZM1106.53 389.715C1106.45 390.457 1106.18 391.405 1106.37 391.515C1111.54 394.474 1116.15 391.915 1120.81 389.075C1116.05 389.289 1111.29 389.5 1106.53 389.715ZM1820.49 142.331C1831.11 142.588 1840.98 139.389 1850.25 145.934C1847.53 137.231 1831.88 135.465 1820.49 142.331ZM1849.17 187.379C1857.16 183.569 1858.58 174.401 1852.96 167.013C1847.26 177.503 1847.26 177.503 1849.17 187.379ZM1815.31 159.266C1825.61 165.93 1824.96 178.772 1835.31 184.492C1838.12 174.73 1840.56 166.267 1842.95 157.943C1833.35 152.51 1825.7 157.062 1815.31 159.266ZM1221.19 375.692C1221.13 376.447 1221.07 377.193 1221.01 377.947C1229.56 378.419 1238.1 379.178 1246.65 379.195C1249.18 379.199 1253.51 377.539 1253.9 375.907C1254.64 372.759 1253.98 368.62 1252.37 365.758C1250.73 362.837 1247.23 360.953 1244.7 358.736C1236.6 364.578 1228.89 370.137 1221.19 375.692ZM1219.35 390.368C1195.84 384.35 1174.7 386.423 1153.89 396.505C1176.04 400.358 1197.4 401.685 1219.35 390.368ZM1228.05 328.217C1233.57 320.036 1233.44 310.439 1227.28 304.057C1218.61 295.072 1209.39 286.735 1196.1 285.238C1190.78 284.64 1185.49 283.826 1180.18 283.076C1152.66 279.182 1125.4 280.185 1098.54 287.738C1084.3 291.742 1070.16 296.096 1055.92 300.087C1028.37 307.809 1000.4 312.592 971.698 313.79C951.286 314.641 930.979 318.257 910.566 319.003C891.186 319.707 873.678 324.976 857.118 334.564C852.448 337.27 849.354 340.44 849.072 346.277C848.76 352.587 852.705 355.187 857.291 357.598C867.069 362.753 876.818 367.971 886.672 372.974C889.02 374.175 891.688 375.111 894.289 375.368C903.279 376.257 912.294 376.982 921.314 377.421C933.575 378.019 945.844 378.297 960.255 378.782C954.666 376.131 950.476 374.824 947.083 372.405C938.342 366.175 929.79 359.596 929.478 347.327C929.263 338.948 931.918 331.395 936.829 324.853C938.671 322.4 942.017 320.027 944.955 319.627C955.555 318.19 966.261 317.435 976.954 316.748C998.087 315.387 1019.24 314.131 1040.39 313.048C1058.83 312.104 1077.29 310.873 1095.75 310.839C1116.92 310.801 1138.09 312.474 1159.26 312.394C1174.59 312.34 1189.49 313.802 1203.94 318.856C1211.84 321.616 1219.55 324.896 1228.05 328.217ZM1223.89 341.017C1221.15 339.344 1218.71 337.683 1216.12 336.297C1199.12 327.197 1180.8 324.12 1161.72 324.032C1145.94 323.96 1130.16 323.163 1114.38 323.083C1096.27 322.986 1078.13 322.805 1060.04 323.618C1037.66 324.617 1015.32 326.48 992.978 328.196C980.621 329.144 968.313 330.876 955.943 331.627C947.8 332.12 945.073 337.961 943.13 343.866C941.309 349.396 944.091 354.429 948.79 357.868C952.276 360.422 955.863 363.002 959.753 364.797C967.074 368.169 974.851 370.567 982.054 374.141C989.59 377.88 997.716 379.477 1005.54 378.5C1024.05 376.181 1043.16 377.256 1060.86 369.602C1063.88 368.295 1067.36 367.672 1070.67 367.503C1097.79 366.142 1124.91 364.624 1152.05 363.849C1172.33 363.271 1192.22 361.501 1211.22 353.716C1217.15 351.289 1221.15 347.5 1223.89 341.017ZM929.048 392.143C929.061 391.367 929.073 390.592 929.086 389.821C924.846 389.821 920.602 389.892 916.362 389.808C903.953 389.555 891.578 389.652 880.165 383.216C871.124 378.12 861.771 373.509 852.301 369.256C841.372 364.35 837.346 355.466 836.356 344.372C835.454 334.269 842.476 328.381 849.401 324.402C863.335 316.398 878.167 309.769 894.533 308.129C902.187 307.362 909.909 307.303 917.588 306.688C937.33 305.099 957.043 302.856 976.815 301.824C1009.67 300.104 1041.11 292.184 1072.37 282.566C1095.16 275.553 1118.31 269.155 1142.49 269.441C1157.26 269.614 1172.04 270.491 1186.78 271.498C1197.23 272.21 1207.31 274.781 1216.51 280.1C1234.4 290.456 1249.25 306.717 1242.03 330.409C1241.3 332.811 1242.37 335.766 1242.67 339.163C1250.79 334.501 1250.79 334.501 1256.79 324.756C1265.14 311.193 1264.46 297.761 1253.88 285.883C1246.74 277.879 1239.04 270.284 1230.94 263.254C1222.08 255.558 1210.73 253.307 1199.58 250.635C1171.69 243.946 1143.78 243.082 1115.6 248.633C1093.54 252.982 1071.48 257.475 1049.25 260.822C1031.27 263.528 1013.65 267.49 996.03 271.852C963.116 280.008 930.064 287.586 897.075 295.438C870.631 301.735 843.964 307.122 818.54 317.241C806.823 321.899 798.338 330.198 790.187 339.175C786.524 343.205 786.777 347.39 789.251 352.119C793.685 360.587 800.581 366.428 808.905 370.302C818.928 374.963 829.452 378.529 839.631 382.87C868.507 395.186 898.246 398.667 929.048 392.143ZM1800.66 155.595C1793.45 169.049 1794.93 178.73 1806.84 185.305C1813.08 188.749 1813.19 197.136 1815.78 204.613H1804.1C1799.42 198.346 1794.63 192.778 1790.86 186.582C1788.31 182.401 1786.07 177.419 1785.75 172.656C1785.23 165.032 1786.48 157.293 1786.86 149.593C1786.98 147.035 1786.99 144.4 1786.55 141.892C1785.22 134.382 1792.39 125.286 1799.73 127.069C1807.31 128.907 1814.18 126.677 1821.36 126.31C1828 125.969 1834.64 125.307 1841.29 124.835C1843.29 124.692 1845.34 124.848 1847.33 124.629C1856.36 123.617 1861.56 128.312 1861.89 137.168C1862.33 148.847 1862.66 160.539 1868.9 171.173C1870.85 174.511 1871.99 178.827 1871.94 182.675C1871.9 185.613 1869.91 188.947 1867.88 191.336C1865.41 194.253 1861.16 195.307 1860.25 200.141C1860.01 201.414 1855.22 202.603 1852.56 202.497C1846.65 202.266 1840.78 201.187 1834.12 200.352V225.59C1839.42 227.386 1844.6 229.995 1850.04 230.741C1855.22 231.457 1860.67 230.02 1866.01 229.94C1870.34 229.873 1874.69 230.585 1879.03 230.648C1887.7 230.762 1896.41 231.234 1905.02 230.547C1926.5 228.84 1947.88 229.696 1969.29 231.516C1976.98 232.17 1984.77 231.428 1992.5 231.769C1996.75 231.95 1998.91 229.982 1999.74 226.353C2002.06 216.086 2006.88 206.185 2003.09 195.058C2002.04 191.96 2003.62 187.986 2003.92 184.412C2005.15 170.233 2006.73 156.075 2007.4 141.867C2007.8 133.572 2006.96 125.177 2006.11 116.886C2005.94 115.267 2003.37 113.017 2001.54 112.591C1985.83 108.912 1969.78 110.42 1953.86 109.767C1943.16 109.329 1932.34 108.789 1921.86 106.804C1900.78 102.817 1879.7 103.732 1858.54 104.891C1854.18 105.135 1849.83 105.624 1845.48 105.78C1836.76 106.083 1828.02 106.703 1819.33 106.341C1808.97 105.902 1798.5 105.316 1788.36 103.331C1783.28 102.336 1779.3 102.749 1773.71 105.645C1773.71 119.002 1773.9 133.054 1773.66 147.098C1773.38 163.19 1772.69 179.278 1772.26 195.374C1772.06 203.003 1771.65 210.657 1772.03 218.265C1772.39 225.683 1777.54 229.11 1784.88 228.17C1787.7 227.811 1791.02 227.71 1793.45 228.861C1796.95 230.522 1799.38 232.895 1804.16 231.259C1808.24 229.864 1814 236.287 1813.74 240.911C1813.64 242.694 1812.4 245.674 1811.22 245.923C1805.83 247.048 1800.68 250.024 1794.65 247.436C1788.9 244.966 1782.65 243.63 1776.63 241.763C1772.54 240.494 1768.47 239.17 1764.92 238.045C1759.32 218.05 1760.69 198.771 1761.9 179.371C1763.22 158.246 1763.4 137.05 1764.07 116.22C1760.72 112.3 1753.62 111.386 1755.68 105.476C1757.84 99.3102 1761.44 93.6286 1764.66 87.8754C1765.15 87.0071 1767 86.4592 1768.2 86.5056C1777.89 86.8723 1787.6 87.2811 1797.27 87.9386C1804.6 88.4317 1811.91 89.966 1819.22 89.8774C1846.68 89.5571 1874.15 88.4908 1901.62 88.3053C1909.94 88.2505 1918.27 90.0502 1926.59 91.1461C1946.22 93.734 1965.91 93.6497 1985.68 93.2914C1993.84 93.1439 2002.14 95.4326 2010.2 97.3124C2016.42 98.7665 2019.16 103.664 2019.8 109.894C2021.2 123.343 2020.85 136.704 2019.11 150.128C2018.08 158.094 2018.07 166.22 2017.95 174.279C2017.77 185.347 2018.7 196.487 2017.71 207.471C2016.81 217.397 2014.88 227.453 2011.71 236.882C2009.2 244.359 2001.98 247.849 1994.04 247.802C1981.98 247.735 1969.91 247.33 1957.87 246.605C1950.94 246.188 1944.08 244.186 1937.17 244.119C1928.51 244.043 1919.85 245.446 1911.18 245.805C1901.52 246.201 1891.84 246.226 1882.17 246.264C1872.77 246.302 1863.3 245.51 1853.96 246.26C1845.97 246.9 1839.33 246.197 1834.81 235.933C1834.31 240.207 1833.53 242.192 1833.98 243.832C1835.54 249.391 1834.38 254.104 1831.39 258.997C1828.51 263.73 1827.64 269.968 1824.09 273.943C1818.41 280.32 1811.82 286.275 1804.61 290.827C1780.9 305.824 1754.76 313.355 1726.68 314.772C1697.49 316.243 1668.35 319.003 1639.15 319.922C1621.74 320.47 1604.25 318.375 1586.79 317.81C1569.67 317.254 1552.54 317.064 1535.41 316.828C1528.07 316.731 1520.71 316.639 1513.39 317.056C1497.97 317.933 1482.44 318.232 1467.19 320.436C1445.28 323.597 1423.51 327.867 1401.84 332.44C1393.77 334.143 1386.1 337.869 1378.36 340.95C1369.96 344.292 1361.73 348.056 1353.35 351.44C1343 355.622 1333.71 360.625 1326.24 369.745C1316.03 382.213 1301.06 386.921 1285.52 389.42C1281.55 390.061 1277.5 390.398 1273.47 390.609C1266.03 391.005 1259.14 392.573 1252.17 395.797C1244.99 399.123 1236.7 400.012 1228.94 402.128C1220.21 404.513 1211.61 407.392 1202.82 409.5C1185.42 413.668 1168.02 410.815 1150.65 408.821C1142 407.826 1133.37 405.63 1124.74 405.694C1116.81 405.757 1108.93 408.37 1100.97 409.428C1081.02 412.079 1061.06 414.743 1041.05 416.926C1019.66 419.261 998.205 420.917 976.798 423.113C934.296 427.459 891.764 431.075 848.979 429.149C832.542 428.407 816.125 427.071 799.687 426.287C777.18 425.212 754.66 423.674 732.145 423.657C702.329 423.64 673.154 419.506 644.059 413.588C607.846 406.225 571.404 399.982 535.283 392.219C511.314 387.068 487.432 381.058 464.066 373.686C437.057 365.168 409.703 359.12 381.721 354.994C358.476 351.558 335.505 346.294 312.349 342.214C289.513 338.189 266.656 334.206 243.698 330.978C218.401 327.416 192.998 324.558 167.604 321.734C155.25 320.36 142.732 320.348 130.429 318.666C114.826 316.538 99.3281 313.541 83.8766 310.456C79.8641 309.659 76.1888 307.147 72.7158 305.583C73.1879 300.205 75.8854 299.164 79.1561 299.577C89.79 300.939 100.382 302.62 111.016 303.982C123.694 305.604 136.385 307.109 149.088 308.513C174.786 311.353 200.522 313.912 226.198 316.942C244.221 319.062 262.235 321.397 280.139 324.327C299.346 327.475 318.406 331.53 337.566 334.998C359.374 338.939 381.27 342.391 403.027 346.585C418.849 349.628 434.988 352.132 450.148 357.324C493.257 372.089 537.66 381.104 582.257 389.551C608.377 394.499 634.529 399.283 660.602 404.475C689.769 410.279 719.294 411.632 748.898 412.479C769.703 413.078 790.49 414.127 811.29 414.924C834.826 415.822 858.362 417.158 881.905 417.411C912.889 417.752 943.615 414.473 974.345 410.305C1000.29 406.781 1026.57 405.685 1052.69 403.468C1056.98 403.106 1061.25 402.499 1065.76 400.412C1063.84 399.919 1061.95 399.266 1060.01 398.958C1053.37 397.905 1046.73 396.311 1040.07 396.168C1032.11 395.995 1023.88 396.071 1016.19 397.875C998.694 401.976 981.021 403.182 963.175 403.721C948.086 404.18 932.846 404.155 917.967 406.355C892.898 410.069 869.269 405.192 845.523 398.225C830.316 393.757 815.8 387.73 801.79 380.628C789.955 374.626 780.172 365.935 775.346 352.878C772.645 345.565 774.251 338.981 778.752 332.95C789.112 319.079 802.587 309.832 818.982 304.003C844.364 294.987 870.568 289.415 896.712 283.384C932.374 275.148 968.28 267.941 1003.38 257.273C1016.49 253.29 1030.36 251.752 1043.89 249.176C1065.32 245.109 1086.75 241.008 1108.21 237.105C1128.77 233.362 1149.56 230.547 1170.34 233.636C1187.88 236.237 1205.38 239.942 1222.42 244.814C1229.41 246.816 1235.4 252.856 1241.4 257.623C1246.39 261.585 1250.42 266.748 1255.42 270.706C1265.72 278.866 1270.48 290.052 1274.23 302.098C1276.69 310.03 1275.63 317.477 1271.85 324.402C1266.89 333.481 1261.22 342.181 1255.36 351.875C1261.66 358.058 1268.34 365.244 1266.22 377.071C1284.89 378.318 1301.65 375.195 1314 361.872C1324.97 350.037 1337.42 342.286 1352.78 337.869C1361.74 335.289 1370.18 330.784 1378.68 326.754C1387.89 322.392 1397.42 319.555 1407.51 318.009C1432.1 314.249 1456.54 309.347 1481.22 306.308C1496.49 304.428 1512.09 305.398 1527.52 304.589C1561.54 302.806 1595.36 306.081 1629.28 307.708C1650.38 308.715 1671.64 306.814 1692.81 305.79C1703.2 305.284 1713.54 303.817 1723.91 302.751C1742.32 300.85 1760.87 299.063 1777.65 290.532C1787.17 285.689 1798.14 281.188 1804.53 273.331C1813.26 262.596 1821.41 250.201 1819.72 234.378C1818.48 222.787 1818.67 211.041 1818.23 199.361C1818.18 198.021 1817.77 196.462 1818.29 195.366C1820.88 189.908 1820.97 185.621 1813.89 184.003C1811.48 173.483 1798.91 167.734 1800.42 155.338C1803.71 151.599 1807.02 147.894 1810.56 143.958C1809.07 143.17 1806.88 142.01 1804.61 140.805C1802.16 145.661 1797.7 149.635 1800.66 155.595Z`;

function ScribbleBorder({ filterId }: { filterId: string }) {
  return (
    <svg
      className="cr-border-svg"
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* Fill behind border */}
      <path
        d={CARD_PATH}
        fill="white"
        stroke="none"
        filter={`url(#${filterId})`}
      />
      {/* Hand-drawn border */}
      <path
        d={CARD_PATH}
        fill="none"
        stroke="#2a2a2a"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${filterId})`}
      />
    </svg>
  );
}

export default function CardReveal(props: CardRevealProps) {
  const { bgColor = "transparent" } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const filterId = `scribble-${uid}`;

  const cards: CardData[] = [];
  for (let i = 1; i <= 3; i++) {
    const image = (props as any)[`card${i}Image`] as CardImage | undefined;
    const title = (props as any)[`card${i}Title`] as string | undefined;
    const body = (props as any)[`card${i}Body`] as string | undefined;
    const btnText = (props as any)[`card${i}BtnText`] as string | undefined;
    const btnLink = (props as any)[`card${i}BtnLink`] as string | undefined;
    if (title || image?.src) {
      cards.push({ image, title, body, buttonText: btnText, buttonLink: btnLink });
    }
  }

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cardEls = root.querySelectorAll<HTMLElement>(".cr-card");
    if (!cardEls.length) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      const vh = window.innerHeight;
      const halfVh = vh * 0.5;

      gsap.set(cardEls, {
        yPercent: 50,
        y: halfVh + 1,
        opacity: 0,
      });

      // --- Enter ---
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      });

      enterTl.to(
        cardEls,
        { yPercent: 0, y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
        "cardsIn"
      );
      enterTl.to(
        cardEls,
        {
          rotation: (_i: number, el: HTMLElement, targets: HTMLElement[]) =>
            ROTATIONS[Array.from(targets).indexOf(el) % ROTATIONS.length],
          duration: 0.5, stagger: 0.1, ease: "power3.out",
        },
        "cardsIn"
      );
      enterTl.to(
        cardEls,
        { rotation: 0, duration: 0.5, stagger: 0.1, ease: "power3.in" },
        "cardsIn+=0.5"
      );

      // --- Exit ---
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      exitTl.to(
        cardEls,
        {
          rotation: (_i: number, el: HTMLElement, targets: HTMLElement[]) =>
            ROTATIONS[Array.from(targets).indexOf(el) % ROTATIONS.length],
          duration: 0.5, stagger: 0.1, ease: "power3.out",
        },
        "cardsOut"
      );
      exitTl.to(
        cardEls,
        { yPercent: -50, y: -halfVh, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.in" },
        "cardsOut"
      );
      exitTl.to(
        cardEls,
        { rotation: 0, duration: 0.5, stagger: 0.1, ease: "power3.in" },
        "cardsOut+=0.5"
      );

      return () => {
        enterTl.kill();
        exitTl.kill();
      };
    }

    // Fallback
    cardEls.forEach((el, i) => {
      el.style.setProperty("--rot", `${ROTATIONS[i % ROTATIONS.length]}deg`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const allCards = root.querySelectorAll<HTMLElement>(".cr-card");
            allCards.forEach((card, i) => {
              setTimeout(() => card.classList.add("cr-visible"), i * 120);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [cards.length]);

  if (cards.length === 0) {
    return (
      <div className="cr-root" style={{ background: bgColor }}>
        <p style={{ textAlign: "center", opacity: 0.5, padding: "40px 0" }}>
          Add card titles and images in the component settings to see the cards.
        </p>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`cr-root cr-root-${uid}`} style={{ background: bgColor }}>
      {/* Shared SVG defs for scribble filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves={2} seed={2} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={5} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className={`cr-grid cr-grid-${uid}`}>
        {cards.map((card, i) => (
          <React.Fragment key={i}>
            <div className="cr-card">
              <ScribbleBorder filterId={filterId} />
              <div className="cr-card-content">
                {card.title && <h3 className="cr-card-title">{card.title}</h3>}
                {card.body && <p className="cr-card-body">{card.body}</p>}
                {card.buttonText && (
                  <a href={card.buttonLink || "#"} className="cr-card-btn">
                    {card.buttonText}
                  </a>
                )}
              </div>
            </div>
            {/* Cable between cards */}
            {i < cards.length - 1 && (
              <div className="cr-cable">
                <svg viewBox="0 0 76 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                  <filter id={`${filterId}-cable`} x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves={2} seed={2} result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale={3} xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  <path
                    d={i === 0 ? CABLE_12 : CABLE_23}
                    fill="none"
                    stroke="#2a2a2a"
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter={`url(#${filterId}-cable)`}
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Cord + plug below the grid */}
      <div className={`cr-plug cr-plug-${uid}`}>
        <svg viewBox="0 0 2180 569" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <mask id={`mask-${uid}`} style={{ maskType: "luminance" } as React.CSSProperties} maskUnits="userSpaceOnUse" x="0" y="0" width="2180" height="569">
            <path d="M0 0H2179.82V569H0V0Z" fill="white" />
          </mask>
          <g mask={`url(#mask-${uid})`}>
            <path d={CORD_PATH} fill="#2a2a2a" />
            <path d={PLUG_PATH} fill="#2a2a2a" />
            <path d={PLUG_PATH_2} fill="#2a2a2a" />
          </g>
        </svg>
      </div>

      <style>{`
        .cr-root-${uid} {
          padding: 80px 20px;
          font-family: 'Rubik', sans-serif;
          color: #000000;
          position: relative;
        }

        .cr-grid-${uid} {
          display: flex;
          align-items: stretch;
          gap: 0;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
        }

        /* === Card === */
        .cr-root-${uid} .cr-card {
          flex: 1 1 0%;
          min-width: 0;
          position: relative;
          min-height: 480px;
          will-change: transform, opacity;
        }

        /* SVG border fills the card area */
        .cr-root-${uid} .cr-border-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        /* Content sits on top of border */
        .cr-root-${uid} .cr-card-content {
          position: relative;
          z-index: 1;
          padding: 44px 36px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100%;
        }
        .cr-root-${uid} .cr-card-title {
          margin: 0 0 12px;
          font-size: 26px;
          font-weight: 800;
          line-height: 1.2;
        }
        .cr-root-${uid} .cr-card-body {
          margin: 0;
          font-size: 15px;
          line-height: 1.6;
          opacity: 0.6;
        }
        .cr-root-${uid} .cr-card-btn {
          display: inline-block;
          margin-top: auto;
          padding: 10px 24px;
          border-radius: 6px;
          background: #1a1a2e;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .cr-root-${uid} .cr-card-btn:hover {
          opacity: 0.85;
        }

        /* === Cable connectors between cards === */
        .cr-root-${uid} .cr-cable {
          flex: 0 0 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: center;
          margin: 0 -12px;
          z-index: 2;
        }
        .cr-root-${uid} .cr-cable svg {
          width: 50px;
          height: 80px;
        }

        /* === Plug below grid === */
        .cr-plug-${uid} {
          max-width: 320px;
          margin: -20px 0 0 auto;
          margin-right: calc(50% - 500px + 80px);
          position: relative;
          z-index: 2;
        }
        .cr-plug-${uid} svg {
          width: 100%;
          height: auto;
        }

        /* === Fallback CSS animation === */
        .cr-root-${uid} .cr-card:not(.cr-visible) {
          transform: translateY(80%) rotate(var(--rot, 0deg));
          opacity: 0;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
        }
        .cr-root-${uid} .cr-card.cr-visible {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
        }

        /* === Mobile === */
        @media (max-width: 767px) {
          .cr-root-${uid} {
            padding: 48px 16px;
          }
          .cr-grid-${uid} {
            flex-direction: column;
            gap: 0;
          }
          .cr-root-${uid} .cr-card {
            min-height: 320px;
          }
          .cr-root-${uid} .cr-card-content {
            padding: 36px 28px;
          }
          .cr-root-${uid} .cr-card-title {
            font-size: 22px;
          }
          .cr-root-${uid} .cr-cable {
            flex: 0 0 40px;
            margin: -8px auto;
            transform: rotate(90deg);
          }
          .cr-plug-${uid} {
            margin-right: auto;
            margin-left: auto;
            max-width: 240px;
          }
        }
      `}</style>
    </div>
  );
}
