const PREFIX = "www.";

/**
 * Format a web address with the prefix www.
 * Don't prefix if the address is already correctly prefixed
 * @param websiteAddress
 * @return formatted web address
 */
export const formatUrl = websiteAddress => {
  if (!websiteAddress) {
    return "";
  }

  // Don't prefix if the address is already correctly prefixed
  if (websiteAddress.startsWith(PREFIX)) {
    return websiteAddress;
  }

  return `${PREFIX}${websiteAddress}`;
};
