"use client";

import { motion } from "framer-motion";

// This file acts as a client-side boundary for framer-motion components.
// By re-exporting them from a "use client" file, we can ensure they are
// only used on the client, avoiding the build error.

export { motion };
