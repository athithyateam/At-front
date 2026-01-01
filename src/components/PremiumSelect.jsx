import * as Select from "@radix-ui/react-select";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

const PremiumSelect = ({ value, onChange, options, placeholder }) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 transition"
        >
          <span>
            {options.find((o) => o.value === value)?.label ||
              placeholder}
          </span>
          <FiChevronDown className="text-gray-500" />
        </button>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          align="start"
          className="z-9999"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="rounded-xl border border-gray-200 bg-white shadow-lg p-1"
          >
            <Select.Viewport>
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className="flex items-center justify-between px-4 py-2 rounded-lg text-sm cursor-pointer outline-none hover:bg-yellow-50 focus:bg-yellow-50"
                >
                  <Select.ItemText>
                    {opt.label}
                  </Select.ItemText>
                  <Select.ItemIndicator>
                    <FiCheck className="text-yellow-600" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </motion.div>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default PremiumSelect;
