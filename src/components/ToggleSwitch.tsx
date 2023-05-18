import React from 'react';
import cx from 'classnames';

type ToggleSwitchProps = {
  isDark: boolean;
  onSetIsDark: (isDark: boolean) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = (props) => {
  const { isDark, onSetIsDark } = props;

  const atClickThemeChangeHandler = React.useCallback(() => {
    const isDarkTheme = document.documentElement.classList.contains('dark');
    if (isDarkTheme) {
      onSetIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      onSetIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, [onSetIsDark]);

  return (
    <button
      onClick={() => atClickThemeChangeHandler()}
      className={cx('flex h-8 w-16 rounded-full bg-gray-600', {
        'bg-green-500': isDark,
      })}
    >
      <span
        className={cx('h-8 w-8 rounded-full border-[1px] border-black bg-white', {
          'ml-8': isDark,
        })}
      />
    </button>
  );
};

export default ToggleSwitch;
