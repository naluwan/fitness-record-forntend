import React from 'react';
import cx from 'classnames';

type ToggleSwitchProps = {
  isDark: boolean;
  onSetIsDark: (isDark: React.SetStateAction<boolean>) => void;
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
      className={cx('flex w-16 h-8 bg-gray-600 rounded-full', {
        'bg-green-500': isDark,
      })}
    >
      <span
        className={cx('h-8 w-8 bg-white rounded-full border-black border-[1px]', {
          'ml-8': isDark,
        })}
      />
    </button>
  );
};

export default ToggleSwitch;
