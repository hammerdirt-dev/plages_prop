import * as React from "react";
import { motion } from "framer-motion";

export const AccordionContent = (props) => {
    return(
  <motion.div
    variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
    transition={{ duration: 0.8 }}
  >
     <div className="acc-row" >
        {
            props.props.map((obj, i) => {
                return (
                      <div key={`${obj.description}-${obj.source}${i}`} name={obj.name} className="acc-cell">
                          {obj.description}
                      </div>
                      )
                  })
        }
    </div>
  </motion.div>
)}
