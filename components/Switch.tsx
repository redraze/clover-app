import { Switch as GlueSwitch } from "@/components/ui/switch"
import colors from "tailwindcss/colors"

export default function Switch ({ onToggle, value, defaultValue }: any) {
    return <GlueSwitch
        size="md"
        trackColor={{ false: colors.neutral[100], true: colors.neutral[300] }}
        thumbColor={colors.neutral[50]}
        ios_backgroundColor={colors.neutral[300]}
        onToggle={onToggle}
        value={value}
        defaultValue={defaultValue}
    />
}