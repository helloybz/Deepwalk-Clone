from pathlib import Path
import unittest

from deepwalk.__main__ import get_parser, run


class TestCLI(unittest.TestCase):
    def setUp(self):
        parser = get_parser()
        self.args = parser.parse_args(args=['--data_root', './tests/test_dataset', '--config_file', './tests/test_configs.yaml', '--output_root', './tests/test_output'])

    def test_run(self):
        run(self.args)
        output_root = Path('./tests/test_output')
        self.assertTrue(output_root.joinpath('Z.npy').exists())
        self.assertTrue(output_root.joinpath('loss.json').exists())

    def tearDown(self):
        import shutil
        shutil.rmtree('./tests/test_output')
