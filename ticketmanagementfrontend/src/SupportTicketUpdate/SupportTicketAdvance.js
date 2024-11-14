import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
// import ticketopen from "../images/ticketopen.svg";
// import ticketclosed from "../images/ticketclosed.svg";
// import ticketinprogress from "../images/ticketinprogress.svg";
import apiUrl from "../utils/apiURL";

const SupportTicketAdvance = ({ ticket, setTicket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(ticket);

  const maxDescriptionLength = 26;

  const truncateDescription = (description, maxDescriptionLength) => {
    return description.length <= maxDescriptionLength
      ? description
      : description.substring(0, maxDescriptionLength) + "...";
  };

  const getStatusIcon = (status) => {
    if (!status) return null;
    switch (status.toLowerCase()) {
      case "open":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="82"
            height="82"
            viewBox="0 0 375 375"
            className="ml-[17px]"
            onClick={(e) => {
              e.stopPropagation();
              setIsStatusModalOpen(true);
            }}
          >
            <defs>
              <clipPath id="a">
                <path d="M99.82 112.371h150v110.25h-150Zm0 0" />
              </clipPath>
            </defs>
            <g clipPath="url(#a)">
              <path
                fill="#8ee124"
                d="M238.047 156.867h-15.613l-42.977-32.234c1.453-1.285 2.387-3.145 2.387-5.235 0-3.875-3.153-7.027-7.024-7.027a7.035 7.035 0 0 0-7.027 7.027c0 2.09.934 3.95 2.387 5.235l-42.977 32.234H111.59c-6.453 0-11.707 5.25-11.707 11.707v42.153c0 6.457 5.254 11.707 11.707 11.707h126.457c6.457 0 11.707-5.25 11.707-11.707v-42.153c0-6.457-5.25-11.707-11.707-11.707m-63.227-39.812c1.29 0 2.34 1.054 2.34 2.343 0 1.29-1.05 2.34-2.34 2.34a2.345 2.345 0 0 1-2.343-2.34 2.347 2.347 0 0 1 2.343-2.343m0 9.953 39.809 29.86h-79.621Zm70.25 83.719a7.03 7.03 0 0 1-7.023 7.023H111.59a7.03 7.03 0 0 1-7.024-7.023v-42.153c0-3.87 3.153-7.023 7.024-7.023h126.457c3.871 0 7.023 3.152 7.023 7.023Zm0 0"
              />
            </g>
            <path
              fill="#8ee124"
              d="M179.504 175.602v28.097a2.34 2.34 0 0 0 2.34 2.344h14.05v-4.684h-11.707v-9.367h11.708v-4.683h-11.708v-9.368h11.708v-4.683h-14.051a2.34 2.34 0 0 0-2.34 2.344m35.125 18.179-9.613-19.226a2.34 2.34 0 0 0-4.437 1.047v30.441h4.683V185.52l9.613 19.23a2.35 2.35 0 0 0 2.633 1.23 2.34 2.34 0 0 0 1.804-2.28v-30.442h-4.683Zm-72.594-20.523c-5.168 0-9.367 4.203-9.367 9.367v14.05c0 5.165 4.2 9.368 9.367 9.368 5.164 0 9.367-4.203 9.367-9.367v-14.051c0-5.164-4.203-9.367-9.367-9.367m4.684 23.418a4.69 4.69 0 0 1-4.684 4.683 4.69 4.69 0 0 1-4.683-4.683v-14.051a4.69 4.69 0 0 1 4.683-4.684 4.69 4.69 0 0 1 4.684 4.684Zm18.734-23.418h-7.027a2.34 2.34 0 0 0-2.34 2.344v30.441h4.684v-14.05h4.683c5.164 0 9.367-4.2 9.367-9.368 0-5.164-4.203-9.367-9.367-9.367m0 14.05h-4.683v-9.367h4.683a4.69 4.69 0 0 1 4.684 4.684 4.69 4.69 0 0 1-4.684 4.684m0 0"
            />
          </svg>
        );
      case "closed":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="82"
            height="82"
            viewBox="0 0 375 375"
            version="1.0"
            className="ml-[17px]"
            onClick={(e) => {
              e.stopPropagation();
              setIsStatusModalOpen(true);
            }}
          >
            <defs>
              <clipPath id="a">
                <path d="M112.5 158h150v75.895h-150Zm0 0" />
              </clipPath>
            </defs>
            <g clip-path="url(#a)">
              <path
                fill="#ff3131"
                d="M248.973 233.613H126.027c-7.457 0-13.527-6.066-13.527-13.523v-48.465c0-7.457 6.07-13.523 13.527-13.523h122.946c7.457 0 13.527 6.066 13.527 13.523v48.465c0 7.457-6.07 13.523-13.527 13.523m-122.946-72.218c-5.644 0-10.238 4.585-10.238 10.23v48.465c0 5.644 4.594 10.238 10.238 10.238h122.946c5.644 0 10.238-4.59 10.238-10.238v-48.465c0-5.645-4.594-10.23-10.238-10.23Zm0 0"
              />
            </g>
            <path
              fill="#ff3131"
              d="m125.465 161.023-1.785-2.765 56.195-35.95 1.785 2.762Zm123.723.106-58.079-36.059 1.786-2.761 58.425 36.273Zm0 0"
            />
            <path
              fill="#ff3131"
              d="M188.227 111.965a7.8 7.8 0 0 1 2.77 1.265 7.7 7.7 0 0 1 1.148 1.012q.521.563.925 1.215.406.656.676 1.375.27.72.39 1.48.124.755.094 1.528a7.7 7.7 0 0 1-.203 1.515q-.174.746-.496 1.446c-.21.469-.469.906-.765 1.324q-.453.621-1.016 1.148a7.8 7.8 0 0 1-2.59 1.598q-.72.271-1.476.395a7.7 7.7 0 0 1-1.528.093 7.6 7.6 0 0 1-1.515-.203 7.74 7.74 0 0 1-3.918-2.277 7.76 7.76 0 0 1-1.993-4.07 7.7 7.7 0 0 1-.097-1.524q.029-.771.203-1.52c.117-.495.285-.98.496-1.445q.32-.697.77-1.324.45-.621 1.011-1.148a8 8 0 0 1 1.215-.926 7.9 7.9 0 0 1 2.856-1.067 7.7 7.7 0 0 1 1.527-.093 7.6 7.6 0 0 1 1.516.203m-40.293 87.64q0 .975-.48 2.102-.477 1.13-1.505 2.219c-.683.726-1.554 1.32-2.62 1.77q-1.595.678-3.716.679a13.3 13.3 0 0 1-2.93-.305 8 8 0 0 1-2.394-.953 8 8 0 0 1-1.98-1.699 10.2 10.2 0 0 1-1.371-2.145 11 11 0 0 1-.856-2.53 14 14 0 0 1-.285-2.86q.001-2.455.71-4.395c.481-1.297 1.161-2.406 2.052-3.324a8.95 8.95 0 0 1 3.12-2.101 10.1 10.1 0 0 1 3.817-.723c1.645 0 3.113.328 4.395.984q1.928.985 2.953 2.434 1.029 1.447 1.027 2.742-.001.709-.5 1.246c-.332.363-.738.54-1.21.54-.524 0-.923-.126-1.184-.376-.266-.246-.559-.68-.883-1.289q-.804-1.513-1.895-2.258-1.089-.75-2.683-.75-2.542-.002-4.047 1.926t-1.504 5.48c0 1.579.219 2.899.664 3.946q.667 1.576 1.89 2.355c.817.516 1.766.778 2.86.778q1.775-.002 3.004-.883c.82-.586 1.433-1.445 1.851-2.586.172-.535.395-.977.653-1.313q.388-.506 1.246-.507c.492 0 .91.175 1.262.515.351.344.539.77.539 1.281m7.738-11.765v14.805h8.351q1.002.002 1.536.484c.355.324.535.734.535 1.219q0 .754-.528 1.214-.525.465-1.543.465h-9.945c-.894 0-1.543-.195-1.937-.593q-.588-.599-.59-1.93V187.84c0-.836.187-1.457.562-1.875q.562-.626 1.477-.625.929 0 1.504.62.579.615.578 1.88m20.656-2.5q3.166.001 5.434 1.285a8.34 8.34 0 0 1 3.437 3.648c.778 1.575 1.168 3.43 1.168 5.555 0 1.57-.21 3-.64 4.29q-.64 1.927-1.91 3.339c-.856.945-1.899 1.664-3.137 2.168q-1.857.75-4.262.75-2.383-.001-4.273-.77-1.888-.772-3.153-2.171c-.844-.93-1.476-2.055-1.906-3.368q-.647-1.97-.649-4.261.001-2.343.676-4.305c.45-1.3 1.098-2.414 1.95-3.328a8.44 8.44 0 0 1 3.109-2.098q1.829-.733 4.156-.734m5.856 10.465q.001-2.238-.723-3.871c-.48-1.094-1.164-1.918-2.063-2.477q-1.334-.84-3.074-.84-1.234 0-2.281.465c-.7.309-1.3.758-1.805 1.356-.508.59-.902 1.347-1.195 2.269q-.439 1.378-.438 3.102 0 1.735.438 3.136c.289.934.703 1.711 1.23 2.325a5.25 5.25 0 0 0 1.836 1.382q1.031.46 2.266.461a5.55 5.55 0 0 0 2.906-.793q1.324-.79 2.11-2.441c.535-1.113.793-2.469.793-4.074m23.156 4.121q0 1.84-.95 3.312c-.632.98-1.562 1.75-2.78 2.301q-1.832.834-4.34.836c-2.008 0-3.66-.379-4.97-1.14a6.55 6.55 0 0 1-2.253-2.184q-.867-1.366-.867-2.656-.001-.754.52-1.286c.347-.355.784-.535 1.323-.535q.657 0 1.102.418.452.417.77 1.23.387.975.84 1.626.45.649 1.269 1.07.816.422 2.152.422 1.828 0 2.977-.852c.765-.566 1.144-1.281 1.144-2.129q0-1.012-.62-1.644-.615-.632-1.595-.965c-.648-.223-1.523-.46-2.613-.707-1.465-.344-2.687-.742-3.672-1.203q-1.476-.685-2.343-1.875c-.575-.79-.868-1.77-.868-2.945q0-1.684.914-2.985c.61-.867 1.497-1.535 2.649-2.004 1.16-.469 2.52-.699 4.078-.699 1.246 0 2.332.156 3.238.465.91.308 1.672.723 2.27 1.23.601.516 1.043 1.051 1.316 1.618.278.562.418 1.117.418 1.652q.001.738-.52 1.324a1.66 1.66 0 0 1-1.296.594c-.477 0-.832-.117-1.074-.352-.246-.234-.512-.625-.797-1.16q-.558-1.155-1.332-1.793-.779-.649-2.5-.648-1.596 0-2.57.699-.98.703-.981 1.687.002.61.332 1.055.328.44.914.762c.39.21.781.383 1.18.504a50 50 0 0 0 1.968.523c1.149.27 2.188.563 3.114.887q1.397.487 2.37 1.18a4.9 4.9 0 0 1 1.532 1.754c.367.718.55 1.585.55 2.613m16.899-11.059h-9.281v4.996h8.547q.944 0 1.406.422.464.424.465 1.117-.002.687-.46 1.13-.46.433-1.415.433h-8.547v5.785h9.602q.967.001 1.46.45.493.448.493 1.202 0 .72-.492 1.172c-.328.297-.817.45-1.461.45h-11.2q-1.343 0-1.937-.598-.591-.598-.59-1.926v-15.29q.002-.885.262-1.448.263-.563.824-.82.564-.258 1.438-.258h10.875q.982-.001 1.46.437.479.436.477 1.14c0 .485-.156.868-.476 1.16-.301.302-.793.446-1.45.446m8.106-3.179h5.367q2.096.001 3.594.39a6.6 6.6 0 0 1 2.718 1.457q3.182 2.72 3.18 8.27c0 1.218-.11 2.332-.32 3.34a9.8 9.8 0 0 1-.985 2.73 8.5 8.5 0 0 1-1.703 2.168 7.2 7.2 0 0 1-1.793 1.184 8 8 0 0 1-2.086.62c-.746.126-1.582.18-2.515.18h-5.367q-1.124.001-1.692-.343a1.55 1.55 0 0 1-.742-.954q-.174-.621-.172-1.605v-14.914c0-.887.195-1.535.594-1.926.39-.394 1.031-.597 1.922-.597m1.594 3.261v13.805h3.12q1.025.002 1.61-.055a5.3 5.3 0 0 0 1.207-.277 3.3 3.3 0 0 0 1.086-.621q2.064-1.752 2.066-6.024 0-3.01-.91-4.511c-.605-.996-1.355-1.637-2.242-1.907q-1.325-.41-3.219-.41Zm0 0"
            />
          </svg>
        );
      case "inprogress":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="82"
            height="82"
            viewBox="0 0 375 375"
            className="ml-[17px]"
            version="1.0"
            onClick={(e) => {
              e.stopPropagation();
              setIsStatusModalOpen(true);
            }}
          >
            <defs>
              <clipPath id="a">
                <path d="M114 178h147v84.5H114Zm0 0" />
              </clipPath>
              <clipPath id="b">
                <path d="M170 112.5h35V146h-35Zm0 0" />
              </clipPath>
            </defs>
            <path
              fill="#ffed00"
              d="M184.379 229.105h-8.52a1.763 1.763 0 0 1-1.757-1.757c0-.97.789-1.758 1.757-1.758h2.547v-10.457h-2.547a1.76 1.76 0 0 1-1.757-1.758 1.76 1.76 0 0 1 1.757-1.754h8.52c.969 0 1.758.79 1.758 1.754a1.76 1.76 0 0 1-1.758 1.758h-2.457v10.457h2.457a1.76 1.76 0 0 1 1.758 1.758c0 .964-.79 1.757-1.758 1.757m14.761 0c-.702 0-1.316-.351-1.577-.968l-3.692-7.293v6.504c0 .964-.793 1.757-1.758 1.757a1.763 1.763 0 0 1-1.758-1.757v-13.973c0-.79.528-1.492 1.317-1.668.793-.262 1.672.176 2.023.879l3.692 7.379v-6.59c0-.965.699-1.754 1.754-1.754.968 0 1.757.79 1.757 1.754v13.973c0 .879-.613 1.582-1.406 1.757zm-32.859-22.495c-.441 0-.879-.176-1.23-.438l-4.746-4.656-4.657 4.656c-.527.437-1.316.613-1.933.351-.613-.265-1.055-.968-1.055-1.668v-14.058c0-.969.793-1.758 1.758-1.758.969 0 1.758.79 1.758 1.758v9.926l2.898-2.899c.703-.703 1.758-.703 2.461 0l2.988 2.899v-9.926c0-.969.79-1.758 1.758-1.758.965 0 1.758.79 1.758 1.758v14.058c0 .7-.441 1.403-1.055 1.668-.265.086-.527.086-.703.086m14.145.001c-4.832 0-8.785-3.954-8.785-8.786s3.953-8.785 8.785-8.785 8.789 3.953 8.789 8.785-3.957 8.785-8.79 8.785m0-14.06c-2.899 0-5.27 2.376-5.27 5.274s2.371 5.274 5.27 5.274c2.902 0 5.273-2.375 5.273-5.274s-2.37-5.273-5.273-5.273m40.157 14.06a1.73 1.73 0 0 1-1.23-.528l-4.22-4.039v2.812a1.76 1.76 0 0 1-1.757 1.754 1.76 1.76 0 0 1-1.754-1.754v-14.058c0-.969.79-1.758 1.754-1.758.969 0 1.758.79 1.758 1.758v2.898l4.219-4.129c.703-.703 1.843-.617 2.46 0a1.8 1.8 0 0 1 0 2.547l-5.886 5.711 5.887 5.801c.703.613.703 1.754 0 2.457a1.74 1.74 0 0 1-1.231.527m-17.132.001h-.177c-.968-.176-1.671-1.055-1.582-2.02.262-2.547-.175-3.778-.703-4.305-.441-.617-.968-.703-1.054-.703h-1.672v5.273a1.76 1.76 0 0 1-1.754 1.754 1.76 1.76 0 0 1-1.758-1.754v-14.058c0-.969.79-1.758 1.758-1.758h3.512c2.902 0 5.273 2.371 5.273 5.27 0 1.496-.613 2.726-1.582 3.691 1.316 1.668 1.844 3.953 1.492 7.027-.086.88-.875 1.582-1.754 1.582m-5.188-10.544h1.758a1.76 1.76 0 0 0 1.757-1.757c0-.965-.789-1.758-1.757-1.758h-1.758Zm3.692 55.975h-.176c-.964-.177-1.668-1.056-1.582-2.024.352-2.547-.175-3.778-.613-4.391-.441-.527-.969-.617-1.144-.617h-1.668v5.273c0 .965-.79 1.758-1.758 1.758a1.766 1.766 0 0 1-1.758-1.758v-14.058c0-.97.793-1.758 1.758-1.758h3.515c2.899 0 5.274 2.37 5.274 5.273 0 1.403-.617 2.723-1.496 3.688 1.32 1.582 1.757 3.953 1.406 7.031-.086.879-.879 1.582-1.758 1.582m-5.183-10.548h1.757c.965 0 1.758-.789 1.758-1.754 0-.968-.793-1.758-1.758-1.758h-1.757Zm19.945 10.549h-6.5a1.763 1.763 0 0 1-1.758-1.759v-14.058c0-.97.79-1.758 1.758-1.758h6.5a1.76 1.76 0 0 1 1.758 1.758c0 .964-.79 1.757-1.758 1.757h-4.742v3.512h4.742c.969 0 1.758.793 1.758 1.758a1.76 1.76 0 0 1-1.758 1.758h-4.742v3.515h4.742c.969 0 1.758.79 1.758 1.758 0 .965-.79 1.758-1.758 1.758m10.719.001c-2.899 0-5.27-2.376-5.27-5.274 0-.965.79-1.758 1.758-1.758.965 0 1.758.793 1.758 1.758 0 .964.789 1.757 1.754 1.757.968 0 1.757-.793 1.757-1.757 0-.965-.789-1.758-1.757-1.758-2.899 0-5.27-2.371-5.27-5.27 0-2.902 2.371-5.273 5.27-5.273a5.286 5.286 0 0 1 5.273 5.273 1.76 1.76 0 0 1-1.758 1.754 1.76 1.76 0 0 1-1.758-1.754 1.76 1.76 0 0 0-1.757-1.758 1.76 1.76 0 0 0-1.754 1.758c0 .965.789 1.754 1.754 1.754 2.902 0 5.273 2.375 5.273 5.274s-2.371 5.273-5.273 5.273m13.706.001c-2.898 0-5.269-2.376-5.269-5.274 0-.965.79-1.758 1.758-1.758.965 0 1.758.793 1.758 1.758 0 .964.789 1.757 1.754 1.757.968 0 1.757-.793 1.757-1.757 0-.965-.789-1.758-1.757-1.758-2.899 0-5.27-2.371-5.27-5.27 0-2.902 2.371-5.273 5.27-5.273a5.286 5.286 0 0 1 5.273 5.273 1.76 1.76 0 0 1-1.758 1.754 1.76 1.76 0 0 1-1.758-1.754 1.76 1.76 0 0 0-1.757-1.758 1.76 1.76 0 0 0-1.754 1.758c0 .965.789 1.754 1.754 1.754 2.902 0 5.273 2.375 5.273 5.274s-2.371 5.273-5.273 5.273m-110.797.001a1.763 1.763 0 0 1-1.758-1.759v-14.058c0-.97.789-1.758 1.758-1.758h3.515c2.899 0 5.27 2.37 5.27 5.273 0 2.899-2.371 5.27-5.27 5.27h-1.757v5.273c0 .965-.793 1.758-1.758 1.758m1.758-10.548h1.757c.965 0 1.754-.789 1.754-1.754a1.76 1.76 0 0 0-1.754-1.758h-1.757Zm18.8 10.549h-.261c-.97-.177-1.668-1.056-1.496-2.024.175-2.02 0-3.602-.7-4.391-.441-.527-.968-.617-1.054-.617h-1.672v5.273c0 .965-.79 1.758-1.758 1.758a1.766 1.766 0 0 1-1.758-1.758v-14.058c0-.97.793-1.758 1.758-1.758h3.43c2.898 0 5.27 2.37 5.27 5.273 0 1.403-.528 2.723-1.493 3.688 1.316 1.582 1.844 3.953 1.406 7.031-.09.879-.793 1.582-1.672 1.582m-5.183-10.548h1.758c.878 0 1.668-.789 1.668-1.754a1.76 1.76 0 0 0-1.754-1.758h-1.672ZM164.7 252.04c-4.833 0-8.7-3.958-8.7-8.79s3.867-8.785 8.7-8.785c4.831 0 8.784 3.953 8.784 8.785s-3.953 8.79-8.785 8.79m0-14.06c-2.813 0-5.184 2.372-5.184 5.27 0 2.902 2.37 5.273 5.183 5.273 2.899 0 5.274-2.37 5.274-5.273 0-2.898-2.375-5.27-5.274-5.27m19.068 14.06h-.176c-3.164 0-5.8-2.638-5.8-5.802v-6.062c0-3.164 2.636-5.711 5.8-5.711h.265c1.754 0 3.25.789 4.305 2.11.613.788.438 1.843-.265 2.46-.79.613-1.934.438-2.547-.265-.352-.528-.88-.79-1.493-.79h-.265c-1.23 0-2.285 1.055-2.285 2.196v6.062c0 1.23 1.054 2.285 2.285 2.285h.176c1.14 0 2.02-.968 2.02-2.02v-1.933h-1.231a1.76 1.76 0 0 1-1.754-1.757c0-.97.789-1.758 1.754-1.758h2.988a1.76 1.76 0 0 1 1.758 1.757v3.692c0 2.984-2.461 5.535-5.535 5.535m0 0"
              fill-rule="evenodd"
            />
            <g clip-path="url(#a)">
              <path
                fill="#ffed00"
                d="M245.45 262.492h-115.9c-8.609 0-15.55-7.027-15.55-15.55v-52.81c0-8.609 6.941-15.55 15.55-15.55h115.9c8.523 0 15.55 6.941 15.55 15.55v52.81c0 8.523-7.027 15.55-15.55 15.55m-115.9-80.394a12 12 0 0 0-12.034 12.035v52.808c0 6.59 5.359 12.04 12.035 12.04h115.898c6.59 0 12.035-5.45 12.035-12.04v-52.808c0-6.676-5.445-12.035-12.035-12.035Zm0 0"
                fill-rule="evenodd"
              />
            </g>
            <path
              fill="#ffed00"
              d="M187.457 137.988c-4.922 0-8.875-4.043-8.875-8.965a8.85 8.85 0 0 1 8.875-8.87c4.918 0 8.961 3.952 8.961 8.87 0 4.922-4.043 8.965-8.961 8.965m0-14.324c-2.988 0-5.36 2.461-5.36 5.36 0 2.988 2.458 5.449 5.36 5.449 2.988 0 5.445-2.461 5.445-5.45 0-2.898-2.457-5.359-5.445-5.359m-25.57 58.434a1.5 1.5 0 0 1-.88-.266c-.878-.437-1.14-1.492-.702-2.371l21.441-37.082c.527-.875 1.582-1.14 2.371-.7.88.524 1.14 1.579.703 2.458l-21.441 37.082c-.352.527-.875.879-1.492.879m-11.95 0c-.265 0-.617-.09-.878-.266-.88-.437-1.141-1.582-.614-2.371l25.39-42.879c.528-.793 1.583-1.055 2.376-.617.875.527 1.14 1.582.613 2.46L151.43 181.22c-.262.527-.88.879-1.493.879m63.176-.001c-.617 0-1.23-.352-1.492-.88l-21.441-37.081c-.528-.88-.176-1.934.617-2.457.875-.442 1.93-.176 2.371.699l21.437 37.082a1.7 1.7 0 0 1-.613 2.371 1.7 1.7 0 0 1-.879.266m11.95 0c-.614 0-1.231-.352-1.583-.88l-25.394-42.792c-.438-.88-.172-1.934.617-2.461.879-.438 1.934-.176 2.461.617l25.39 42.879c.442.789.176 1.934-.613 2.371a1.7 1.7 0 0 1-.879.266m0 0"
              fill-rule="evenodd"
            />
            <g clip-path="url(#b)">
              <path
                fill="#ffed00"
                d="M187.457 145.633c-9.14 0-16.52-7.469-16.52-16.61 0-9.046 7.38-16.515 16.52-16.515 9.137 0 16.606 7.469 16.606 16.515 0 9.141-7.47 16.61-16.606 16.61m0-29.613c-7.117 0-13.004 5.886-13.004 13.003 0 7.207 5.887 13.094 13.004 13.094 7.203 0 13.09-5.887 13.09-13.094 0-7.117-5.887-13.003-13.09-13.003m0 0"
                fill-rule="evenodd"
              />
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  const getPriorityColor = (priority) => {
    if (!priority) return "#00ffff"; // Default color for missing priority
    switch (priority.toLowerCase()) {
      case "high":
        return "#FF0000"; // Red for high priority
      case "medium":
        return "#FFFF00"; // Yellow for medium priority
      case "low":
        return "#00FF00"; // Green for low priority
      default:
        return "#ffffff"; // Fallback color
    }
  };

  const handleAssignTicket = async () => {
    try {
      setIsLoading(true);
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData._id;

      const response = await axios.put(
        `${apiUrl}/api/v1/tickets/update-ticket/${ticket.data._id}`,
        JSON.stringify({ assignedagent: userId }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsModalOpen(false);

        const ticketResponse = await axios.get(
          `${apiUrl}/api/v1/tickets/get-ticket/${ticket.data._id}`
        );

        if (ticketResponse.status === 200) {
          setTicket(ticketResponse.data);
        } else {
          console.error("Error fetching updated ticket data");
        }
      } else {
        console.error("Error updating ticket");
        console.log(response);
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnassignTicket = async () => {
    try {
      setIsLoading(true);

      const response = await axios.put(
        `${apiUrl}/api/v1/tickets/update-ticket/${ticket.data._id}`,
        JSON.stringify({ assignedagent: null }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsModalOpen(false);

        const ticketResponse = await axios.get(
          `${apiUrl}/api/v1/tickets/get-ticket/${ticket.data._id}`
        );

        if (ticketResponse.status === 200) {
          setTicket(ticketResponse.data);
        } else {
          console.error("Error fetching updated ticket data");
        }
      } else {
        console.error("Error updating ticket");
        console.log(response);
      }
    } catch (error) {
      console.error("Error unassigning ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      setIsLoading(true);

      const response = await axios.put(
        `${apiUrl}/api/v1/tickets/update-ticket/${ticket.data._id}`,
        JSON.stringify({ status }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsStatusModalOpen(false);

        const ticketResponse = await axios.get(
          `${apiUrl}/api/v1/tickets/get-ticket/${ticket.data._id}`
        );

        if (ticketResponse.status === 200) {
          setTicket(ticketResponse.data);
        } else {
          console.error("Error fetching updated ticket data");
        }
      } else {
        console.error("Error updating ticket status");
        console.log(response);
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header Row */}
      <div className="grid grid-cols-10 gap-4 p-2 font-bold text-center text-white border-b border-gray-300">
        <div className="whitespace-nowrap">Ticket ID</div>
        <div className="whitespace-nowrap">Subject</div>
        <div className="whitespace-nowrap">Age</div>
        <div className="whitespace-nowrap">Created By</div>
        <div className="whitespace-nowrap">Updated By</div>
        <div className="whitespace-nowrap">Updated Date</div>
        <div className="whitespace-nowrap">Status</div>
        <div className="whitespace-nowrap">Priority</div>
        <div className="whitespace-nowrap">Agent</div>
        <div className="whitespace-nowrap">Description</div>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="relative p-6 bg-[#0000007d]  w-[24%] rounded-lg">
            <button
              className="absolute top-2 right-2 text-[white] font-bold  "
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <h2 className="mb-4 text-xl font-bold text-[white]">
              {ticket.data.assignedagent
                ? "Unassign or Reassign This Ticket"
                : "Assign This Ticket To Yourself"}
            </h2>
            {ticket.data.assignedagent && (
              <button
                onClick={handleUnassignTicket}
                className="px-4 py-2 mb-2 bg-red-500 rounded-lg text-[white]"
                disabled={isLoading}
              >
                {isLoading ? "Unassigning..." : "Unassign"}
              </button>
            )}
            <button
              onClick={handleAssignTicket}
              className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Assigning..." : "Assign"}
            </button>
          </div>
        </div>
      )}

      {isStatusModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="relative p-6  bg-[#0000007d] rounded-lg ">
            <button
              className="absolute top-2 right-2 text-[white] font-bold "
              onClick={() => setIsStatusModalOpen(false)}
            >
              X
            </button>
            <h2 className="mb-4 text-xl font-bold text-white">
              Update Ticket Status
            </h2>
            <button
              onClick={() => handleStatusChange("open")}
              className="px-4 py-2 mb-2 text-white bg-green-500 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Mark as Open"}
            </button>
            <button
              onClick={() => handleStatusChange("closed")}
              className="px-4 py-2 mb-2 ml-2 text-white bg-red-500 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Mark as Closed"}
            </button>
            <button
              onClick={() => handleStatusChange("inprogress")}
              className="px-4 py-2 ml-2 text-white bg-yellow-500 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Mark as In Progress"}
            </button>
          </div>
        </div>
      )}

      <motion.div
        key={ticket.data._id}
        className="relative grid grid-cols-10 gap-4 p-4 mt-4 rounded-lg bg-[#07070787] text-[aliceblue] items-center text-center cursor-pointer"
        whileHover={{
          boxShadow: "0 0 30px #020617b3",
          transition: { duration: 0.3 },
        }}
        initial={{ backgroundColor: "#07070787" }}
        animate={{ backgroundColor: "#07070787" }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="text-[aliceblue]">
          {ticket.data.ticketCode || "N/A"}
        </div>
        <div className="text-[aliceblue] hover:text-red-700">
          {ticket.data.title || "N/A"}
        </div>
        <div className="text-[aliceblue] hover:text-blue-500">
          {ticket.data.ageInDays ? `${ticket.data.ageInDays} d` : "N/A"}
        </div>
        <div className="text-[aliceblue]">
          {ticket.data.owner?.firstname
            ? `${ticket.data.owner.firstname} ${ticket.data.owner.lastname}`
            : "N/A"}
        </div>
        <div className="text-[aliceblue]">
          {ticket.data.updatedby === "NA" ? (
            <lord-icon
              src="https://cdn.lordicon.com/aycieyht.json"
              trigger="hover"
              colors="primary:#dd335c,secondary:#08a88a"
              style={{ width: "50px", height: "44px" }}
            ></lord-icon>
          ) : (
            ticket.data.updatedby || "N/A"
          )}
        </div>

        <div className="text-[aliceblue]">
          {ticket.data.updated !== null ? (
            new Date(ticket.data.updated).toLocaleDateString()
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/qvyppzqz.json"
              trigger="hover"
              style={{ width: "50px", height: "35px" }}
              colors="primary:#dd335c,secondary:#dd335c"
            ></lord-icon>
          )}
        </div>

        <div className="text-[aliceblue]">
          {getStatusIcon(ticket.data.status)}
        </div>
        <div className="text-[#dd335c]">
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: getPriorityColor(ticket.data.priority) }}
          ></span>
        </div>
        <div className="text-[aliceblue]">
          {ticket.data.assignedagent ? (
            <div className="text-[aliceblue]">
              {`${ticket.data.assignedagent?.firstname || "N/A"} ${
                ticket.data.assignedagent?.lastname || "N/A"
              }`}
            </div>
          ) : (
            <button
              className="text-[aliceblue] focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              <lord-icon
                src="https://cdn.lordicon.com/bgebyztw.json"
                trigger="hover"
                state="hover-looking-around"
                colors="primary:#dd335c,secondary:#dd335c"
                style={{ width: "50px", height: "37px" }}
              ></lord-icon>
            </button>
          )}
        </div>

        <div className="truncate-description text-[aliceblue]">
          {truncateDescription(
            ticket.data.explainproblem || "No description",
            maxDescriptionLength
          )}
        </div>
      </motion.div>
    </>
  );
};

export default SupportTicketAdvance;
