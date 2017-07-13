import React, { Component } from 'react';

export default class VisitScore extends Component {
  render() {
    return (
      <svg
        viewBox="0 0 346 201"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <circle id="path-1" cx="174.0065" cy="171.8285" r="28.8285" />
        </defs>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="fuelMeter">
            <path
              d="M3.5,177.337 L55.727,177.337 C55.727,146.196 68.349,118.003 88.757,97.596 L51.827,60.666 C21.968,90.525 3.5,131.774 3.5,177.337 Z"
              id="Shape"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="#92D14F"
              fillRule="nonzero"
            />
            <path
              d="M51.827,60.666 L88.757,97.596 C109.165,77.188 137.357,64.566 168.498,64.566 L168.498,12.339 C122.935,12.339 81.685,30.807 51.827,60.666 Z"
              id="Shape"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="#FCBF02"
              fillRule="nonzero"
            />
            <g id="Oval" fillRule="nonzero">
              <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1" />
              <circle
                stroke="#454B59"
                strokeWidth="10"
                cx="174.0065"
                cy="171.8285"
                r="23.8285"
              />
            </g>
            <path
              d="M333.496,177.337 L281.269,177.337 C281.269,146.196 268.647,118.003 248.239,97.596 L285.169,60.666 C315.028,90.525 333.496,131.774 333.496,177.337 Z"
              id="Shape"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="#D82724"
              fillRule="nonzero"
            />
            <path
              d="M285.169,60.666 L248.239,97.596 C227.831,77.188 199.639,64.566 168.498,64.566 L168.498,12.339 C214.061,12.339 255.311,30.807 285.169,60.666 Z"
              id="Shape"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="#EF7F1A"
              fillRule="nonzero"
            />
            <g id="meter">
              <text
                id="LOW"
                transform="translate(14.532421, 98.635188) rotate(-70.000000) translate(-14.532421, -98.635188) "
                fontFamily="HelveticaNeue-Medium, Helvetica Neue"
                fontSize="12"
                fontWeight="400"
                fill="#000000"
              >
                <tspan x="-6.72901824" y="103.135188">LOW</tspan>
              </text>
              <text
                id="MEDIUM"
                transform="translate(91.457987, 22.045709) rotate(-30.000000) translate(-91.457987, -22.045709) "
                fontFamily="HelveticaNeue-Medium, Helvetica Neue"
                fontSize="12"
                fontWeight="400"
                fill="#000000"
              >
                <tspan x="60.640902" y="26.5457088">MEDIUM</tspan>
              </text>
              <text
                id="HIGH"
                transform="translate(258.099401, 27.821171) rotate(25.000000) translate(-258.099401, -27.821171) "
                fontFamily="HelveticaNeue-Medium, Helvetica Neue"
                fontSize="12"
                fontWeight="400"
                fill="#000000"
              >
                <tspan x="227.282316" y="32.3211713">HIGH</tspan>
              </text>
              <text
                id="CRITICAL"
                transform="translate(325.944981, 106.297760) rotate(65.000000) translate(-325.944981, -106.297760) "
                fontFamily="HelveticaNeue-Medium, Helvetica Neue"
                fontSize="12"
                fontWeight="400"
                fill="#000000"
              >
                <tspan x="295.127896" y="110.79776">CRITICAL</tspan>
              </text>
              <path
                d="M167.082174,140.150135 C182.527241,142.402604 194.712155,154.589038 196.964624,170.034105 L265.032654,72.082105 L167.082174,140.150135 Z"
                id="needle"
                fill="#454B59"
                fillRule="nonzero"
                transform="translate(216.057414, 121.058105) rotate(355.000000) translate(-216.057414, -121.058105) "
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}
